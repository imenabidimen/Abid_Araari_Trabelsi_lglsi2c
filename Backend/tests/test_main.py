import os
import unittest
from unittest.mock import patch
from fastapi import HTTPException

from MyDB.main import admin_token_is_valid, dish_table, hash_password, verify_password


class PasswordTests(unittest.TestCase):
    def test_hash_and_verify(self):
        password = "sample-password-123"
        stored = hash_password(password)

        self.assertNotEqual(stored, password)
        self.assertTrue(verify_password(password, stored))
        self.assertFalse(verify_password("wrong-password", stored))

    def test_legacy_plaintext_password_can_be_verified_for_migration(self):
        self.assertTrue(verify_password("legacy-password", "legacy-password"))
        self.assertFalse(verify_password("wrong-password", "legacy-password"))


class AdminTokenTests(unittest.TestCase):
    def test_admin_token_requires_a_configured_secret_and_exact_match(self):
        with patch.dict(os.environ, {"FOODY_ADMIN_TOKEN": "test-secret"}):
            self.assertTrue(admin_token_is_valid("test-secret"))
            self.assertFalse(admin_token_is_valid("wrong-secret"))
            self.assertFalse(admin_token_is_valid(None))

        with patch.dict(os.environ, {"FOODY_ADMIN_TOKEN": ""}):
            self.assertFalse(admin_token_is_valid("test-secret"))


class DishTableTests(unittest.TestCase):
    def test_supported_categories_map_to_fixed_table_names(self):
        self.assertEqual(dish_table("tunisian"), "Tunisian")
        self.assertEqual(dish_table("DESSERT"), "Dessert")
        self.assertEqual(dish_table("Italian"), "Italian")

    def test_unknown_category_is_rejected(self):
        with self.assertRaises(HTTPException) as error:
            dish_table("Tunisian; DROP TABLE signup")

        self.assertEqual(error.exception.status_code, 404)


if __name__ == "__main__":
    unittest.main()
