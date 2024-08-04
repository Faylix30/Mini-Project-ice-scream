const mysql = require("mysql");

module.exports = {
    createPayment: async (pool, order_id, date, total_price, image_name) => {
        var sql = "INSERT INTO payment (order_id, date ,total_price, image_name)"
            + "VALUES (?,?,?,?)";

        sql = mysql.format(sql, [order_id, date, total_price, image_name]);

        return await pool.query(sql);
    }
}