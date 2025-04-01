import pool from "../config/db";
import { Store } from "../models/storeModel";

// Add Store
export const addStore = async (storeData: Store) => {
  try {
    const query = `
      INSERT INTO stores (name, description)
      VALUES ($1, $2) RETURNING *;
    `;
    const values = [storeData.name, storeData.description];
    const result = await pool.query(query, values);

    return result.rows[0];
  } catch (error) {
    console.error("Error adding store:", error); // Log the error for debugging
    throw new Error("Failed to add store"); // Throw a custom error message
  }
};

// Fetch All Stores
export const fetchAllStores = async () => {
  try {
    const query = `SELECT * FROM stores;`;
    const result = await pool.query(query);

    return result.rows;
  } catch (error) {
    console.error("Error fetching stores:", error); // Log the error for debugging
    throw new Error("Failed to fetch stores"); // Throw a custom error message
  }
};

// Fetch Store by ID
export const fetchStoreById = async (id: string) => {
  try {
    const query = `SELECT * FROM stores WHERE id = $1;`;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error("Store not found");
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error fetching store by ID:", error); // Log the error
    throw new Error("Failed to fetch store by ID");
  }
};

// Modify Store
export const modifyStore = async (id: string, storeData: Partial<Store>) => {
  try {
    const query = `
      UPDATE stores SET name = $1, description = $2, updated_at = NOW()
      WHERE id = $3 RETURNING *;
    `;
    const values = [storeData.name, storeData.description, id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      throw new Error("Store not found for update");
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error modifying store:", error); // Log the error for debugging
    throw new Error("Failed to modify store");
  }
};

// Remove Store
export const removeStore = async (id: string) => {
  try {
    const query = `DELETE FROM stores WHERE id = $1;`;
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      throw new Error("Store not found for deletion");
    }
  } catch (error) {
    console.error("Error removing store:", error); // Log the error
    throw new Error("Failed to remove store");
  }
};

// Fetch Store by Name
export const fetchStoreByName = async (name: string) => {
  try {
    const query = `SELECT * FROM stores WHERE LOWER(name) = LOWER($1);`;
    const result = await pool.query(query, [name]);

    if (result.rows.length === 0) {
      return null; // Return null if no store is found
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error fetching store by name:", error); // Log the error
    throw new Error("Failed to fetch store by name");
  }
};
