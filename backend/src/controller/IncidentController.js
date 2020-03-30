const connection = require('../database/connection');

module.exports = {
    async Index(request, response){
        const [count]  = await connection('incidents').count();
        const {page = 1} = request.query;
        const incident = await connection('incidents')
        .join('ongs', 'ongs.id' ,'=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select('incidents.*', 'ongs.name', 'ongs.whatsapp', 'ongs.email', 'ongs.city', 'ongs.uf');


        response.header('X-Total-Count',count['count(*)']);

        return response.json(incident);
    },

    async Create(request,response){
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })
        return response.json(id);
    },
    async delete(request, response){
        const {id} = await request.params;
        const ong_id =  request.headers.authorization;

        const incidents = await connection('incidents')
        .where('id',id)
        .select('ong_id')
        .first();
        if(incidents.ong_id !== ong_id ){
            return response.status(401).json({error: 'Operação não permitida'});
        }
        await connection('incidents').where('id',id).delete();

        return response.status(204).send;
    }
}