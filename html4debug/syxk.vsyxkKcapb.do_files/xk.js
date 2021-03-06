	//根据ID获得HTML对象
	function getElementById(objId)
	{
		var obj = null;
		if (document.layers) {
			//we want 1 object (not nested)
			if (getElementById.arguments.length == 1) {
				//simple layer reference
				obj = eval("document.layers['" + objId + "']");
			} else if (mElement.arguments[1] == 'DoC') {
				//refer document in layer: document.layers[layername].document
				obj = eval("document.layers['" + objId + "'].document");
			} else if (mElement.arguments[1] == 'iMageZ') {
				//refer an image: document.images[imageName]
				obj = eval("document.images['" + objId + "']");
			//nested objects
			} else if (mElement.arguments.length>1) {
				obj = "document.layers['" + mElement.arguments[1] + "']";//start the string
				for (var i=2;i<mElement.arguments.length;i++) {
					if ( (mElement.arguments[i] != 'DoC') 
							&& (mElement.arguments[i] != 'iMageZ') 
							&& (mElement.arguments[i] != 'ForMz') ) {
						obj = obj + ".document.layers['" + mElement.arguments[i] + "']";//get the next layer
					}
				}
				if (mElement.arguments[mElement.arguments.length-1] == 'iMageZ')  {
					obj = obj + ".document.images['" + objId + "']";
				} else if (mElement.arguments[mElement.arguments.length-1] == 'ForMz')  {
					obj = obj + ".document.forms['" + objId + "']";
				} else {
					obj = obj + ".document.layers['" + mElement.arguments[0] + "']";
					if (mElement.arguments[mElement.arguments.length-1] == 'DoC') {
					obj = obj + ".document";
					}
				}
				obj = eval(obj);//wrap up and make string into an object
			} else {
				obj = eval("document.layers['" + mElement.arguments[1] + "'].document." + objId);
			}
		//old IE browsers:
		} else if (document.all) {
			obj = eval('document.all.' + objId);
		//W3C standard:
		} else {
			obj = document.getElementById(objId);
		}
		return obj;
	}
	
	//检查filter和value是否相等，如果filter为空默认为true
	function checkEqual(filter,value) {
  	if(isEmpty(filter)) {
  		return true;
  	} else {
  		if(filter == value) {
  			return true;
  		} else {
  			return false;
  		}
  	}
  }
  //检查value是否包含filter,filter为空默认为等
  function checkInclude(filter,value) {
  	if(isEmpty(filter)) {
  		return true;
  	} else {
  		if(!isEmpty(value) && value.indexOf(filter) != -1) {
  			return true;
  		}else {
  			return false;
  		}
  	}
  }
  //把string中的<br>替换\n\r
  function replaceBR(inputstr) {
  	return inputstr.replace(/<br>/g,"\n\r");
	}
	