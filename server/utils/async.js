async function sqlAsync (sql, connection) {
    return new Promise((resolve, reject)=>{
        connection.query(sql, async (err, result) => {
            if (err) {
                return reject(err);
            }else{
                return resolve(result)
            }
        })
    })
} 

module.exports = {
    sqlAsync
}