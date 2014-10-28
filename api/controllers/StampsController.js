/**
 * StampsController
 *
 * @description :: Server-side logic for managing stamps
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	stampDevice: function(req, res){
		var reqDeviceId = req.param('deviceId');
		if (reqDeviceId != null || reqDeviceId != undefined){
			Devices.find({deviceId: reqDeviceId}).exec(function(e1, found){
				if (found.length > 0){
					StampsServices.stampDevice({id: found[0].id}, function(stampCreated){
						console.log('found');
						return res.json({error: '', data: stampCreated});						
					});
				}
				else{
					Devices.create({deviceId: reqDeviceId}).exec(function (e2, createdDevice){
						console.log('created device : ' + createdDevice.id);
						StampsServices.stampDevice({id: createdDevice.id}, function(stampCreated){
							console.log('found');
							return res.json({error: '', data: stampCreated});						
						});
					});
				}				
			});
		}
		else{
			console.log('no device param.');
			return res.json({error: 'no device param.'});
		}
	},

	getStampsCount: function(req, res){
		var reqDeviceId = req.param('deviceId');
		if (reqDeviceId != null || reqDeviceId != undefined){
			Devices.find({deviceId: reqDeviceId}).exec(function(e1, found){
				return res.json({count: found.length});
			});
		}
		else{
			return res.json({error: 'no device param.'});
		}
	}
};

