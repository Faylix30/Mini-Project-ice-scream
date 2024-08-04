const mysql = require("mysql");

module.exports = {
    createProduct: async (pool, product_name, price, stock, image_url) => {
        var sql = "INSERT INTO products (product_name, price ,stock, image_url)"
            + "VALUES (?,?,?,?)";

        sql = mysql.format(sql, [product_name, price, stock, image_url]);

        return await pool.query(sql);
    },

    updateProduct: async (pool, product_id, product_name, price, image_url, stock) => {
        var sql = "UPDATE products SET "
            + "product_name = ? , price = ? , image_url= ? , stock = ? "
            + "WHERE product_id = ?";
        sql = mysql.format(sql, [product_name, price, image_url, stock, product_id]);

        return await pool.query(sql);
    },

    deleteProduct: async (pool, product_id) => {
        var sql = "DELETE FROM products WHERE product_id = ?";
        sql = mysql.format(sql, [product_id]);
        
        return await pool.query(sql);
    }

}