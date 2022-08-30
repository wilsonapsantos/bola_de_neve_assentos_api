const Column = require('../models/ColumnData');

module.exports = {
    async create(req, res) {

        await Column.remove({});

        const options = { ordered: true };
        Column.insertMany(req.body, options).then(() => {
            return res.json({
                success: "Registros inseridos com sucesso!"
            })
        }).catch((err) => {
            return res.json({
                error: "Houve um erro ao inserir os registros!"
            })
        })
    },
    async edit(req, res) {
        try {
            const { id, filled } = (req.body);
            const split = id.split("-");
            const column = await Column.findOne({ columnName: split[0] });

            column.rows.forEach(row => {
                if (row.rowNumber === parseInt(split[1])) {
                    row.seats.forEach(seat => {
                        if (seat.number === parseInt(split[2])) {
                            seat.filled = filled;
                        }
                    });
                }
            });

            await Column.updateOne({ _id: column._id }, column);
            res.status(200).json({ message: "coluna editado com sucesso!" });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: 'Falha ao editar o coluna: ' + error.message });
        }
    },
    async delete(req, res) {

    },
    async get(req, res) {
        const columns = await Column.find({});
        return res.json(columns);
    },
}