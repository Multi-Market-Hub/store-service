import pool from "../config/db";
import { Store } from "../models/storeModel";
import logger from "../utils/logger";

// Add Store
export const addStore = async (storeData: Store) => {
  try {
    const query = `INSERT INTO stores (name, description) VALUES ($1, $2) RETURNING *;`;
    const values = [storeData.name, storeData.description];
    const result = await pool.query(query, values);

    logger.info("Store added successfully", { store: result.rows[0] });
    return result.rows[0];
  } catch (error) {
    logger.error("Error adding store", { error });
    throw new Error("Failed to add store");
  }
};

// Fetch All Stores
export const fetchAllStores = async () => {
  try {
    const query = `SELECT * FROM stores;`;
    const result = await pool.query(query);

    logger.info("Fetched all stores", { count: result.rows.length });
    return result.rows;
  } catch (error) {
    logger.error("Error fetching stores", { error });
    throw new Error("Failed to fetch stores");
  }
};

// Fetch Store by ID
export const fetchStoreById = async (id: string) => {
  try {
    const query = `SELECT * FROM stores WHERE id = $1;`;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      logger.warn("Store not found", { id });
      throw new Error("Store not found");
    }

    logger.info("Fetched store by ID", { store: result.rows[0] });
    return result.rows[0];
  } catch (error) {
    logger.error("Error fetching store by ID", { error });
    throw new Error("Failed to fetch store by ID");
  }
};

// Modify Store
export const modifyStore = async (id: string, storeData: Partial<Store>) => {
  try {
    const query = `UPDATE stores SET name = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING *;`;
    const values = [storeData.name, storeData.description, id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      logger.warn("Store not found for update", { id });
      throw new Error("Store not found for update");
    }

    logger.info("Store modified successfully", { store: result.rows[0] });
    return result.rows[0];
  } catch (error) {
    logger.error("Error modifying store", { error });
    throw new Error("Failed to modify store");
  }
};

// Remove Store
export const removeStore = async (id: string) => {
  try {
    const query = `DELETE FROM stores WHERE id = $1;`;
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      logger.warn("Store not found for deletion", { id });
      throw new Error("Store not found for deletion");
    }

    logger.info("Store removed successfully", { id });
  } catch (error) {
    logger.error("Error removing store", { error });
    throw new Error("Failed to remove store");
  }
};

// Fetch Store by Name
export const fetchStoreByName = async (name: string) => {
  try {
    const query = `SELECT * FROM stores WHERE LOWER(name) = LOWER($1);`;
    const result = await pool.query(query, [name]);

    if (result.rows.length === 0) {
      logger.warn("Store not found by name", { name });
      return null;
    }

    logger.info("Fetched store by name", { store: result.rows[0] });
    return result.rows[0];
  } catch (error) {
    logger.error("Error fetching store by name", { error });
    throw new Error("Failed to fetch store by name");
  }
};
