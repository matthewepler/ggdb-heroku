export default function(data) {
	let validData = {
		quote: 			{value: null, msg: null},
		season:     {value: null, msg: null},
		episode:    {value: null, msg: null},
		timecode: 	{value: null, msg: null},
		screengrab: {value: null, msg: null},
		from: 			{value: null, msg: null},
		to: 		  	{value: null, msg: null},
		location: 	{value: null, msg: null},
		description:{value: null, msg: null},
		refThumb: 	{value: null, msg: null},
		refName: 		{value: null, msg: null},
		refIs: 			{value: null, msg: null},
		refCategory:{value: null, msg: null},
		refYear1: 	{value: null, msg: null},
		refYear2: 	{value: null, msg: null},
		wikipedia:  {value: null, msg: null},
		images: 		{value: null, msg: null},
		video: 			{value: null, msg: null},
		refNotes: 	{value: null, msg: null},
		editornote: {value: true, msg: null},
	};
	
	// console.log("quote", data.quote);
	if (data.quote.length > 1) {
		if (/(?:\/\/)/g.test(data.quote) === false)  { // cheap search for links
			validData.quote.value = data.quote;
		} else {
			validData.quote.value = false;
			validData.quote.msg = "Your quote appears to have a link in it. Please remove it."
		}	
	} else {
		validData.quote.value = false;
		validData.quote.msg = "Please provide a quote."
	}
	
	// console.log("season", data.season);
	// no validation needed since it's coming from a pre-defined list
	validData.season.value = data.season;

	// console.log("episode", data.episode);
	// no validation needed since it's coming from a pre-defined list
	validData.episode.value = data.episode;

	// console.log("timecode", data.timecode);
	if (/^([0-9][0-9]?)\:([0-9][0-9])$/.test(data.timecode)) {
		validData.timecode.value = data.timecode;
	} else {
		validData.timecode.value = false;
		validData.timecode.msg = "Timecode should be three or four numbers seperated by a colon - 09:18 or 9:18."
	}

	// console.log("screengrab", data.screengrab);
	if (/\.(?:jpe?g|png|gif)$/.test(data.screengrab) || data.screengrab.includes('firebasestorage.googleapis.com')) {
		validData.screengrab.value = data.screengrab;
	} else {
		validData.screengrab.value = false;
		validData.screengrab.msg = "Please upload a screengrab that is a .jpg, .jpeg, .png, or .gif."
	}

	// console.log("from", data.from);
	// no validation needed since it's coming from a pre-defined list
	validData.from.value = data.from;

	// console.log("to", data.to);
	// no validation needed since it's coming from a pre-defined list
	validData.to.value = data.to;

	// console.log("location", data.location);
	// no validation needed since it's coming from a pre-defined list
	validData.location.value = data.location;

	// console.log("scene description", data.description);
	if (data.description.length > 1) {
			if (/(?:\/\/)/g.test(data.description) === false)  { // cheap search for links
			validData.description.value = data.description;
		} else {
			validData.description.value = false;
			validData.description.msg = "Your scene description appears to have a link in it. Please remove it."
		}
	} else {
		  validData.description.value = false;
			validData.description.msg = "Please provide a description for your screengrab."
	}

	// console.log("refThumb", data.refThumb);
	// if it includes firebasestorage.googleapis.com
	if (/\.(?:jpe?g|png|gif)$/.test(data.refThumb) || data.refThumb.includes('firebasestorage.googleapis.com')) {
		validData.refThumb.value = data.refThumb;
	} else {
		validData.refThumb.value = false;
		validData.refThumb.msg = "Please upload a thumbnail image that is a .jpg, .jpeg, .png, or .gif."
	}

	// console.log("refName", data.refName);
	if (data.refName.length > 1) {
			if (/(?:\/\/)/g.test(data.quote) === false) {
				if (data.quote.includes(data.refName)) {
					validData.refName.value = data.refName; // no longer forcing upper-case @ char 0.
				} else {
					validData.refName.value = false;
					validData.refName.msg = "The name you provided for your rerence does not match the name as you wrote it in the quote."
				}
			} else {
				validData.refName.value = false;
				validData.refName.msg = "Your reference name appears to contain a link. Please remove it."
			}
		} else {
				validData.refName.value = false;
				validData.refName.msg = "Please provide a name for the person, place, or thing referenced in the quote."
		}

	// console.log("refIs", data.refIs);
	// starts with 'is, was, are, were'.
	if (data.refIs.length > 1) {
		if (data.refIs.indexOf('...') >= 0) {
			data.refIs = data.refIs.split('...')[1].trim();
		}
		if (/^(is)|^(was)|^(are)|^(were)/i.test(data.refIs)) {
			validData.refIs.value = data.refIs.charAt(0).toLowerCase() + data.refIs.slice(1); // force lower-case at char 0
		} else {
			validData.refIs.value = false;
			validData.refIs.msg = "This should start with is/was or are/were";
		}
	} else {
			validData.refIs.value = false;
			validData.refIs.msg = "Please provide a description of the person, place, or thing. It should start with \"is,\" \"was,\" \"are\", or \"were.\"";
	}
	

	// console.log("refCategory", data.refCategory);
	// no validation needed since it's coming from a pre-defined list
	validData.refCategory.value = data.refCategory;

	// console.log("refYear1", data.refYear);
	if (/-?\d{4}/.test(data.refYear1)) {
		validData.refYear1.value = data.refYear1;
	} else {
		validData.refYear1.value = false;
		validData.refYear1.msg = "Check 1st date. Years should be 4 digits. If 'B.C.', make it negative (and still 4 digits, so 45 B.C. is -0045.";
	}

	// console.log("refYear2", data.refYear);
	if (String(data.refYear2).length > 0) {
		if (/-?\d{4}/.test(data.refYear2) || data.refYear2 === 'now') {
			validData.refYear2.value = data.refYear2;
		} else {
			validData.refYear2.value = false;
			validData.refYear2.msg = "Check 2nd date. Years should be 4 digits. If 'B.C.', make it negative (and still 4 digits, so 45 B.C. is -0045.";
		}
	} else {
		validData.refYear2.value = ' ';
	}
	

	// console.log("wikipedia", data.wikipedia);
	if (/^(https?:\/\/en.wikipedia.org\/wiki\/)/.test(data.wikipedia)) {
		validData.wikipedia.value = data.wikipedia;
	} else {
		validData.wikipedia.value = false;
		validData.wikipedia.msg = "Your wikipedia link doesn't look right. It should start with 'https://en.wikipedia.org/wiki/'"
	}

	// console.log("images", data.images);
  if (/^(https:\/\/www.google.com\/search\?)/.test(data.images) && data.images.includes("tbm=isch")) {
  	validData.images.value = data.images;
  } else {
  	validData.images.value = false;
  	validData.images.msg = "Your Google images link doesn't look right. It should start with 'https://www.google.com/search?' and contain 'tbm=isch'"
  }

	// console.log("video", data.video);
	if (data.video.length > 1) {
		if (/^(https:\/\/www.youtube.com)/.test(data.video)) {
			validData.video.value = data.video;
		} else {
			validData.video.value = false;
			validData.video.msg = "Your YouTube link doesn't look right. It should start with 'https://www.youtube.com'"
		}
	} else {
		validData.video.value = '';
	}
	

	// console.log("refNotes", data.refNotes);
	validData.refNotes.value = data.refNotes;

	// add editor's note:
	validData.editornote.msg =  "If this isn't working for you or you think one of these errors is just plain wrong, email me and I'll fix it! matthewepler@gmail.com. xo."
	
	return validData;
}