const AWS = require('aws-sdk');
const uuidv1 = require('uuid').v1;
var path = require('path');

let awsConfig = {
	region: "us-east-1",
	bucket: "hashbuckets3",
	accessKeyId: "AKIA4XVLXX6BNURHBBCA",
	secretAccessKey: "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"
};


// const s3Client = new AWS.S3({
// 	accessKeyId: awsConfig.accessKeyId,
// 	secretAccessKey: awsConfig.secretAccessKey,
// 	region: awsConfig.region
// });

const cartifig = {
	accessKeyId: awsConfig.accessKeyId,
	secretAccessKey: awsConfig.secretAccessKey,
	region: awsConfig.region
};

const uploadParams = {
	Bucket: awsConfig.bucket, 
	Key: '', // pass key
	Body: null, // pass file body
	ACL: "public-read"
};

async function doUpload(req, filder = null) {
	// console.log('mimetype', req.file);
	let uni = uuidv1();
	const params = uploadParams;
	if (filder !== null) {
		params.Key = filder + "/"+ uni + path.extname(req.file.originalname);
	} else {
		params.Key = uni + path.extname(req.file.originalname);
	}
	let originalName = req.file.originalname;
	params.Body = req.file.buffer;
	try {
		let s3Get = await new AWS.S3(cartifig).putObject(params).promise();
		let data = {
			status: true,
			"originalname":originalName,
			url: "https://" + params.Bucket + ".s3." + awsConfig.region + ".amazonaws.com/" + params.Key,
			data: {
				url: "https://" + params.Bucket + ".s3." + awsConfig.region + ".amazonaws.com/" + params.Key,
				s3Get
			}
		};
		// console.log("Successfully uploaded data to bucket", data);
		return data;
	} catch (e) {
		console.log("Error uploading data: ", e);
		return {
			status: false,
			e
		};
	}
}

async function multipleUpload(req, filder = null, callback) {
	const file = req.files;
	let dataRetun = [];
	let senddata = { status : true, data: []};
	let b= 0;
	file.map(async (item, i) => {
		let uni = uuidv1();
		let params = uploadParams;
		if (filder !== null) {
			params.Key = filder + "/"+ uni + path.extname(item.originalname);
		} else {
			params.Key = uni + path.extname(item.originalname);
		}
		params.Body = item.buffer;
			let s3Get = await new AWS.S3(cartifig).putObject(params).promise();
			let data = {
				url: "https://" + params.Bucket + ".s3." + awsConfig.region + ".amazonaws.com/" + params.Key,
				data: s3Get
			};
			senddata.data.push(data);
			console.log("Successfully uploaded data to bucket", data);
			b=i;
			
		if (Number(file.length) == Number(b + 1)) {
			await callback(null, senddata);
		}
	});
	
	
	
 }



module.exports = {
	doUpload,
	multipleUpload
};