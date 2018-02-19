import SampleController from './../controllers/sampleController';
import sampleCustomValidator from './../middleware/sampleCustomValidator';
import schemaValidator from './../middleware/schemaValidation';

import getSchema from './../schemas/getSampleDataSchema';
import addSchema from './../schemas/addSampleDataSchema';
import schema from './../schemas/sampleDataSchema';

export default function (app: any) {

    /**
     * @api {get} '/api/sample' Get all sample data
     * @apiName Get all SampleData
     * @apiGroup SampleApi
     *
     *
     * @apiSuccess {String} message Notification
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *        	SampleData[]
     *     }
     *
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 200 Not Found
     *     {
     *       No records found
     *     }
     *
     */
    app.get('/api/sample', SampleController.get);

    /**
     * @api {getById} '/api/sample/:id' Get sample data by Id
     * @apiName Get SampleData by Id
     * @apiGroup SampleApi
     *
     * @apiParam {Number} Id Unique reference
     *
     * @apiSuccess {String} SampleData Stringified JS object of the application
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *        	SampleData{}
     *     }
     *
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 200 Not Found
     *     {
     *       No records found
     *     }
     *
     */
    app.get('/api/sample/:id', schemaValidator(getSchema), SampleController.getById);

    /**
     * @api {post} '/api/sample/:id' Add a new SampleData Object
     * @apiName Add SampleData
     * @apiGroup SampleApi
     *
     * @apiParam {Number} Id Unique reference
     * @apiParam {String} SampleData object using JSON.stringify
     *
     * @apiSuccess {Number} Id Unique reference
     * @apiSuccess {String} message Notification
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": 123456,
     *       "message": "Data Successfully Added"
     *     }
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "Issue parsing JSON:{\"Name\":\"Peter\""
     *     }
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 509 Service Unavailable
     *     {
     *       "Database inaccessable."
     *     }
     *
     */
    app.put('/api/sample/:id', schemaValidator(schema), sampleCustomValidator , SampleController.put);

    /**
     * @api {put} '/api/sample/:id' Update SampleData Object
     * @apiName Update SampleData
     * @apiGroup SampleApi
     *
     * @apiParam {Number} Id Unique reference
     * @apiParam {String} SampleData object using JSON.stringify
     *
     * @apiSuccess {Number} Id Unique reference
     * @apiSuccess {String} message Notification
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": 123456,
     *       "message": "Data Successfully Updated"
     *     }
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "Issue parsing JSON:{\"Name\":\"Peter\""
     *     }
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 509 Service Unavailable
     *     {
     *       "Database inaccessable."
     *     }
     *
     */
    app.post('/api/sample', schemaValidator(addSchema), SampleController.post);

    /**
     * @api {put} '/api/sample/:id' Delete SampleData Object
     * @apiName Delete SampleData
     * @apiGroup SampleApi
     *
     * @apiParam {Number} Id Unique reference
     * @apiParam {String} SampleData object using JSON.stringify
     *
     * @apiSuccess {Number} Id Unique reference
     * @apiSuccess {String} message Notification
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": 123456,
     *       "message": "Data Successfully Delete"
     *     }
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 400 Bad Request
     *     {
     *       "Issue parsing JSON:{\"Name\":\"Peter\""
     *     }
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 509 Service Unavailable
     *     {
     *       "Database inaccessable."
     *     }
     *
     */
    app.delete('/api/sample/:id', schemaValidator(schema), sampleCustomValidator , SampleController.remove);

}