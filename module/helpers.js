import { isDice, isAbilityKeyReserved } from './utils.js';
import { CTHACK } from './config.js';

export const registerHandlebarsHelpers = function() {
	Handlebars.registerHelper('concat', function() {
		var outStr = '';
		for (var arg in arguments) {
			if (typeof arguments[arg] != 'object') {
				outStr += arguments[arg];
			}
		}
		return outStr;
	});

	Handlebars.registerHelper('hasModifier', function(modifier) {
		if (modifier !== null && modifier !== 0 ){
			return true;
		}
		return false;
	});


	Handlebars.registerHelper('isModifierPositive', function(modifier) {
		if (modifier !== null && modifier > 0 ){
			return true;
		}
		return false;
	});

	Handlebars.registerHelper('isModifierNegative', function(modifier) {
		if (modifier !== null && modifier < 0 ){
			return true;
		}
		return false;
	});

	Handlebars.registerHelper('toLowerCase', function(str) {
		return str.toLowerCase();
	});

	Handlebars.registerHelper('toUpperCase', function(str) {
		return str.toUpperCase();
	});

	Handlebars.registerHelper('toAbbr', function(str) {
		var outStr = 'CTHACK.Save' + str.substring(0, 1).toUpperCase() + str.substring(1) + 'Abbr';
		return outStr;
	});

	Handlebars.registerHelper('getSaveLabel', function(str) {
		var outStr = 'CTHACK.Save' + str.substring(0, 1).toUpperCase() + str.substring(1);
		return outStr;
	});

	Handlebars.registerHelper('toDesc', function(str) {
		var outStr = 'CTHACK.Save' + str.substring(0, 1).toUpperCase() + str.substring(1) + 'Desc';
		return outStr;
	});

	// Return the dice from a value
	Handlebars.registerHelper('toDice', function(value) {
		if (isDice(value)) {
			var outStr = `1d{{value}}`;
			return outStr;
		}
		if (CTHACK.debug) (`{{value}} is not a valid dice value`);
	});

	Handlebars.registerHelper('equals', function(val1, val2) {
		return val1 === val2;
	});

	Handlebars.registerHelper('notEquals', function(val1, val2) {
		return val1 !== val2;
	});

	Handlebars.registerHelper('stringNotEmpty', function(str) {
		return str !== '';
	});

	Handlebars.registerHelper('stringNeitherNullEmpty', function(str) {
		return str !== null && str !== '';
	});

	Handlebars.registerHelper('booleanToString', function(value) {
		if (value) {
			return game.i18n.localize('CTHACK.YES');
		}
		return game.i18n.localize('CTHACK.NO');
	});

	Handlebars.registerHelper('isEnabled', function(configKey) {
		const value = game.settings.get("cthack", configKey);
		if (value === false || value == "none" || value == "") return false;
        return true;

	});

	Handlebars.registerHelper('isWealthAsResource', function() {
		const value = game.settings.get("cthack", "Wealth");
		return value == 'resource';
	});

	Handlebars.registerHelper('getFortuneValue', function() {
		return game.settings.get('cthack', 'FortuneValue');
	});

	Handlebars.registerHelper('getMiscellaneousValue', function() {
		return game.settings.get('cthack', 'MiscellaneousResource');
	});

	Handlebars.registerHelper('shouldDisplayFortuneUse', function() {
		if (game.settings.get('cthack', 'FortuneValue') > 0){
			return true;
		}
		else {
			return false;
		}
	});

	Handlebars.registerHelper('getAdrenalineImage', function(value) {
		if (value === 'pj') {
			return 'icons/commodities/currency/coin-plain-portal-gold.webp';
		} else return 'icons/commodities/currency/coin-embossed-skull-silver.webp';
	});

	Handlebars.registerHelper('getItemsAndWeapons', function(items) {
		return items.filter((item) => item.type === 'item' || item.type === 'weapon');
	});

	Handlebars.registerHelper('rangeDesc', function(str) {
		return CTHACK.range[str];
	});

	Handlebars.registerHelper('isDiceRollable', function(dice) {
		return dice !== "" && dice !== "0";
	});

	Handlebars.registerHelper('timeSince', function(timeStamp) {
		timeStamp = new Date(timeStamp);
		let now = new Date(),
			secondsPast = (now - timeStamp) / 1000,
			since = '';

		// Format the time
		if (secondsPast < 60) {
			since = parseInt(secondsPast);
			if (since <= 0) return 'Now';
			else since = since + 's';
		} else if (secondsPast < 3600) since = parseInt(secondsPast / 60) + 'm';
		else if (secondsPast <= 86400) since = parseInt(secondsPast / 3600) + 'h';
		else {
			let hours = parseInt(secondsPast / 3600),
				days = parseInt(hours / 24);
			since = `${days}d ${hours % 24}h`;
		}

		// Return the string
		return since + ' ago';
	});

	Handlebars.registerHelper('abilityPeriodToString', function(str) {
		const period = CTHACK.abilityUsePeriod[str];
		return game.i18n.localize(period);
	});

	Handlebars.registerHelper('isAbilityKeyReadOnly', function(key) {
		if (isAbilityKeyReserved(key)) {
			return 'readonly';
		}
	});

	Handlebars.registerHelper('getStyleForDice', function(value) {
		if (value === undefined) return;
		if (value === "" || value == 0 || value == 1) return `style="color:white;"`;
		return `style="background-image:url('systems/cthack/ui/dice/${value}-grey.svg');"`;
	});
};
