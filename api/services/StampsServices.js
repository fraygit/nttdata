module.exports = {
	stampDevice: function(dataParam, cb){
		console.log('param:' + dataParam.id);
		var currentDateTime = new Date();
		Stamps.create({dateStamp: currentDateTime, device: dataParam.id}).exec(function(e1, created){
			console.log('stamped!' + created.id);
			cb(created);
		});
	}
};