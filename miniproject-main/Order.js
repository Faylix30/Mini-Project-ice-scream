const mysql = require("mysql");

module.exports = {
    createOrder: async (pool, user_id, image_url, product_name, topping, amount, total_price, address, number, ware) => {
        var sql = "INSERT INTO oder (user_id, image_url,product_name ,topping, amount, total_price, address, number, ware)"
            + "VALUES (?,?,?,?,?,?,?,?,?)";

        sql = mysql.format(sql, [user_id, image_url, product_name, topping, amount
            , total_price, address, number, ware]);

        return await pool.query(sql);
    },

    deleteOrder: async (pool, order_id) => {
        var sql = "DELETE FROM oder WHERE order_id = ?";
        sql = mysql.format(sql, [order_id]);
        return await pool.query(sql);
    }
}