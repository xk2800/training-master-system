import { models } from '../../db.js';
import { Stream } from 'stream';

export default (req, res) => {
    const id = req.params.id;
    
    models.post.findByPk(id)
        .then(data => {
            const fileContents = Buffer.from(data.content, "base64");
            const readStream = new Stream.PassThrough();
            readStream.end(fileContents);

            res.set('Content-disposition', 'attachmen; filename = ' + data.fileName)
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving materials with id = " + id
            });
        });
}