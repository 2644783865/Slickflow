/*------------------------------------------|
| �������ѡ������                        ��|
|-------------------------------------------|
| Դ�����ԣ�http://blog.csdn.net/cxzhq2002��|
| �� �� BY: jiangzhengjun  2008-12-16       |
| �������ܣ�֧��ģ����λ��֧�����¼�ѡ��  |
| ֧��ע�Ͳ㹦�ܡ�֧�ְ��س�������������  ��|
| ѡ��ѡ��                              ����|
|------------------------------------------*/

//������ѡ������Ӧ�Ĳ������
var SELECT_DIV="SELECT_DIV_";

//ע�Ͳ������
var NODE_DIV="NODE_DIV_";
var textObject;

//�����Ƿ���ѡ�����:��ʼʱΪfalse,��ʾĬ�ϲ���ѡ�����
//��Ҫ��ֹ�����ѡ����ʱ���ı����ʧȥ���㣬����ѡ���ͻ�������أ���ʱ��δ
//�õ����ѡ����ѡ�в���ֵ���ı�����ȥ����ʱ�������������ѡ�����ʱcursorInSelectDivObj=ture
//��ʱ���ʱ������������ѡ��㣬��ѡ�к�������cursorInSelectDivObj=false����ʱ�Ϳ�������ѡ�����
var cursorInSelectDivObj=false;

//�Ƿ���ie�����
var ie=(document.getElementById && document.all);

//ȫ�ֵ�ע������
var noteArr = new Array();


//�Է������Ѵ��ڣ�ѭ��ȡ�������ж��Ƿ����"Textselectshow_Div"�Ķ���
//������ڣ�������ȡ��Ϊ"Textselectshow_Div1"�����"Textselectshow_Div1"
//���Ǵ��ڣ���ȡ��Ϊ"Textselectshow_Div2"����������:"Textselectshow_Div..."
for(var i=0;document.getElementById(SELECT_DIV)!=null;i++){	
	var tmpNm = SELECT_DIV + i;
	//�������ͬ���ģ���������ȡ��Ϊ Textselectshow_Div + i �����Textselectshow_Div + i
	//���ڣ���ѭ��ȡ��Ϊ Textselectshow_Div + i + 1��ֱ��������Ϊֹ��������ڣ���ֵΪ������ѭ��
	SELECT_DIV=(document.getElementById(tmpNm)==null)?tmpNm:SELECT_DIV;
}

//��ͬ����������ʽΪע�Ͳ�ȡ��
for(var i=0;document.getElementById(NODE_DIV)!=null;i++){
	var tmpNm = NODE_DIV + i;
	NODE_DIV=(document.getElementById(tmpNm)==null)?tmpNm:NODE_DIV;
}

//Ϊ���������򴴽�һ����Ӧ�Ĳ㣬���Ҹճ�ʼ��ʱΪ���ص�
document.write ('<div id="' + SELECT_DIV + '" style="position: absolute;'
								+ 'cursor: default;border: 1px solid #B2B2B2;background-color: #fff;display: none;"></div>')
//ͬ����ʽ����һ��ע�Ͳ�
document.write ('<div id="' + NODE_DIV + '"  style="position: absolute;'
								+ 'cursor: default;border: 1px solid #B2B2B2;background-color:#ffffd9;display: none;'
								+ 'overflow-x:auto;word-wrap:break-word"></div>')

// ��ȡĳ���������
function getObjPosition(Obj){
	try{		
		var sumTop=0;
		var sumLeft=0;
		
		while(Obj!=window.document.body){
			sumTop+=Obj.offsetTop;
			sumLeft+=Obj.offsetLeft;	
			Obj=Obj.offsetParent;
		}
		return {left:sumLeft,top:sumTop};
	}catch(e){alert(e);}
}

//����Div�е�ѡ��/* ĳ��ѡ��ı����ID */
function optionDivOnmouseover(optionDivObj,textId){
	//�ı���
	var textObj=document.getElementById(textId);

	//optionDivObj.parentNodeΪĳselect optionѡ������Ӧ��ĸ����󣬼�SELECT_DIV��
	//�õ�select����������optionѡ������Ӧ�Ĳ�
	var objChilddiv=optionDivObj.parentNode.getElementsByTagName("div");
	
	//�������ѡ������ʽ����ȥ��ԭ������Ϊ��ɫ��ѡ������ʽ
	for(var i=0; i < objChilddiv.length; i++){
		objChilddiv[i].style.cssText='';
	}
	
	//ʹ����ѡ���ı���Ϊ��ɫ����Ϊ��ɫ��ģ��ѡ����ʽ
	optionDivObj.style.cssText = 'background-color: #479ff3;color: #ffffff;'
 	
 	var noteDivObj =document.getElementById(NODE_DIV);
	var selectDivObj =document.getElementById(SELECT_DIV);
	
	///////����ע�Ͳ��е�ѡ�λ��
 	setNoteDivObj(textObj,optionDivObj,selectDivObj,noteDivObj);	
 
	//���ĳ��ѡ���ʱ
	optionDivObj.onclick=function(){

		//���ѡ���ѡ����Ҫ���أ���Ҫ���ó�ʧȥ����״̬
		cursorInSelectDivObj=false;
		
		//��ѡ�е�ĳѡ�������ݸ�ֵΪ�ı���
		if(ie){
			textObj.value=optionDivObj.outerText;  	
		}
		else
		{
			textObj.value=optionDivObj.textContent;
		}
		
		//var noteDivObj =document.getElementById(NODE_DIV);
		
		//���ĳ��ѡ���ʱ����Ӧ��ע�Ͳ�ҲҪ����
		noteDivObj.style.display='none';		

		//�������ʹ�ı����ȡ����
		textObj.focus();

		////////�����ı���ʧȥ���㴥���ķ���
		textObjectBlur(selectDivObj,noteDivObj);		
	}
}

/**
* textObj:�ı���
* seleObj:������
* noteArr:noteArr עጔ��M���]�п��Բ�����Ϊnull�������
*/
function showSelect(textObj,seleObj,arrNote){	
	textObject = textObj;
	
	//����ȫ��ע�ͣ�����������ʹ��
	noteArr = arrNote;
	var selectDivObj =document.getElementById(SELECT_DIV);
	var noteDivObj =document.getElementById(NODE_DIV);
	var seleObj =document.getElementById(seleObj);
	

	///////����Ƴ��������ʱ
	selectDivObj.onmouseout=function(){		
		//������Ƴ�ѡ���ʱ������ѡ���Ϊʧȥ����״̬	
		cursorInSelectDivObj=false;
		
		//������Ƴ�ѡ���ʱ�����ı����ȡ����
		textObj.focus();
	}
	
	///////�ı���ʧȥ����ʱ
	textObj.onblur=function(){
		textObjectBlur(selectDivObj,noteDivObj);		
	}
	
	///////��꾭���������ʱ
	selectDivObj.onmouseover=function(){
		//������ƽ�ѡ���ʱ������ѡ���Ϊ��ý���״̬	
		cursorInSelectDivObj=true;
	}
		
	///////�ı�����ʱ
	textObj.onclick=function(){
 		//�����������Ӧ���е�ѡ�λ��
		setSelectDivObj(textObj,selectDivObj,seleObj);

		//����ע�Ͳ��е�ѡ�λ��
		setNoteDivObj(textObj,null,selectDivObj,noteDivObj);
		
		//�Զ�ƥ����ģ����λ
		autoMatch(textObj,selectDivObj);	
 	}
 	
 	///////�ı���������ʱ
 	textObj.onkeyup=function(){
 		//���������Tab��ʱֱ���˳�
 		if(event.keyCode==9){
 			return false;
 		}
 		
 		if(event.keyCode==13){
 			enter(textObj,selectDivObj,noteDivObj);	
 			return false;
 		}
 	
		//�����������Ӧ���е�ѡ�λ��
		setSelectDivObj(textObj,selectDivObj,seleObj);
		
		//����������¼�ʱ
 		if(event.keyCode == 38 || event.keyCode == 40 ){
 			var selectedOptionDiv = downOrUp(textObj,selectDivObj,noteDivObj,seleObj); 		
 			//����ע�Ͳ��е�ѡ�λ��
			setNoteDivObj(textObj,selectedOptionDiv,selectDivObj,noteDivObj);		
 		}else{
 			//����ע�Ͳ��е�ѡ�λ��
			setNoteDivObj(textObj,null,selectDivObj,noteDivObj);		
 		} 	
 		
 		//�Զ�ƥ����ģ����λ
		autoMatch(textObj,selectDivObj);
 	}
}

// �����ڵ�IDΪobjID�Ķ��󣨲㣩������select
function hiddenOverSelects(objID){
	var sels = document.getElementsByTagName('select'); 
	for (var i = 0; i < sels.length; i++){
		if (obj1OverObj2(document.getElementById(objID), sels[i])){
			sels[i].style.visibility = 'hidden'; 	
		}else{
			sels[i].style.visibility = 'visible';	
		}		
	}
}

//�ж�obj1�Ƿ��ڵ���obj2
function obj1OverObj2(obj1, obj2){
	var pos1 = getObjPosition(obj1) 
	var pos2 = getObjPosition(obj2) 
	var result = true; 
	var obj1Left = pos1.left - window.document.body.scrollLeft; 
	var obj1Top = pos1.top - window.document.body.scrollTop; 
	var obj1Right = obj1Left + obj1.offsetWidth; 
	var obj1Bottom = obj1Top + obj1.offsetHeight;
	var obj2Left = pos2.left - window.document.body.scrollLeft; 
	var obj2Top = pos2.top - window.document.body.scrollTop; 
	var obj2Right = obj2Left + obj2.offsetWidth; 
	var obj2Bottom = obj2Top + obj2.offsetHeight;
	
	if (obj1Right <= obj2Left || obj1Bottom <= obj2Top || 
	obj1Left >= obj2Right || obj1Top >= obj2Bottom) 
	result = false; 
	return result; 
}


//�ı���ʧȥ����ʱ���õķ���
function textObjectBlur(selectDivObj,noteDivObj){
		//��������ĳ��ѡ���������ѡ���Ϊʧȥ����״̬����ʱѡ������������
		if(!cursorInSelectDivObj){
			selectDivObj.style.display='none';
		}
		
		if(ie){
			//�ָ������ѱ����ص�������
			hiddenOverSelects(selectDivObj.id);	
			if(noteDivObj.style.display=='inline'){
				noteDivObj.style.display=selectDivObj.style.display;
			}
			
			if(selectDivObj.style.display=='none'){
				noteDivObj.style.display='none';
			}
		}	
}

//�����������Ӧ���е�ѡ���λ��
function setSelectDivObj(textObj,selectDivObj,seleObj){
	//�������ʾ����ֱ���˳�
	if(selectDivObj.style.display=='inline'){
		return false;
	}

	//����ı����idΪ��ʱ����Ҫ����
	for(var i=0;textObj.id=='';i++){
		var tmpNm = "textSelect" + i;
		textObj.id = (document.getElementById(tmpNm)==null)?tmpNm:'';
	}

	selectDivObj.style.left = getObjPosition(textObj).left;
	selectDivObj.style.top = getObjPosition(textObj).top + textObj.offsetHeight;
	selectDivObj.style.width = textObj.offsetWidth;
	selectDivObj.style.height = '';
	selectDivObj.style.overflowY = '';
	selectDivObj.innerHTML='' 
  
	//��ȡselect����Ŀ�ŵ�Div�
	for(var x = 0; x<seleObj.options.length; x++){
		selectDivObj.innerHTML+="<div onmouseover=\"optionDivOnmouseover(this,'" 
		+ textObj.id 
		+ "')\" style='width:100%;white-space: nowrap;cursor: default;'>"
		+seleObj.options[x].text+"</div>";
	}
	
 	//����Div�߶ȣ�������ʾ������
	if(x > 8){
		selectDivObj.style.height=13 * 8;
		selectDivObj.style.overflowY='auto';
	}else{
		selectDivObj.style.height=15 * x;
		selectDivObj.style.overflowY='auto';
	}
 
	selectDivObj.style.display='inline';
	if(ie){
		hiddenOverSelects(selectDivObj.id);
	}
}

//�����������Ӧ���е�ѡ���λ��
function setNoteDivObj(textObj,optionDivObj,selectDivObj,noteDivObj){

	 //�����Ҫ��ʾ��Ӧ����ע��ʱ
	if(noteArr != null && noteArr != undefined){
			
			//��ȡ����������Ӧ�Ĳ�Ŀ������߾�
			var regStr = new RegExp("(([0-9]+)px)");		
			selectDivObj.style.width.match(regStr);
			var width=RegExp.$2;
			regStr = new RegExp("(([0-9]+)px)");
			selectDivObj.style.left.match(regStr);
			var left= RegExp.$2;
			//����ע�Ͳ��λ�����С
			noteDivObj.style.left=parseInt(width) +parseInt(left);
			noteDivObj.style.top=selectDivObj.style.top;			
			noteDivObj.style.width=width*1;
			noteDivObj.style.height=selectDivObj.style.height;
		
			var i = 0;			

			//����ҵ���Ӧ��ע�ͣ�����ʾע�Ͳ�
			for(i = 0;i < noteArr.length;i++){
				if(optionDivObj==null && textObj.value == noteArr[i][0]){
					noteDivObj.innerText=noteArr[i][1];
					noteDivObj.style.display="inline";
					break;
				}else if(optionDivObj !=undefined 
					&& optionDivObj !=null 
					&& optionDivObj.outerText == noteArr[i][0]){
					noteDivObj.innerText=noteArr[i][1];
					noteDivObj.style.display="inline";
					break;
				}
			}
			
			if(i==noteArr.length){				
				noteDivObj.innerText='';
				noteDivObj.style.display="none";
			}
	
	}
}

//�Զ�ƥ��ѡ���з����ı����������ֵ�ļ�¼
function autoMatch(textObj,selectDivObj){
 	if(textObj.value==''){
  	return null;
  }
  
  if(event.keyCode == 38 || event.keyCode == 40 ){
  	return null;
  } 

	return autoMatch_(textObj,selectDivObj);
}

//String.fromCharCode
function autoMatch_(textObj,selectDivObj){
  var objChilddiv=selectDivObj.getElementsByTagName("div");  
  var arr = new Array();
  //������в����ʽ
  for(var x=0;x<objChilddiv.length;x++){
  	objChilddiv[x].style.cssText='';
  }
	

	var selectOptionDivObj = null;
	var textValueReg = replaceReg(textObj.value);
	
	for(var x=0;x<objChilddiv.length;x++){
		var strChilddiv=(ie)?objChilddiv[x].outerText:textObj.textContent;
		var regRegExp = new RegExp('^'+textValueReg);	
		//alert('^'+textValueReg + "   " + strChilddiv + "   " + textObj.value);
		
		//��ģ��ƥ��
		if(regRegExp.test(strChilddiv)){
			//��ģ��ƥ�䵽��ѡ������
			selectDivObj.scrollTop=objChilddiv[x].offsetHeight*x;		
			
			//�پ�ȷƥ�䣬���þ�ȷƥ��ĳ�ѡ��״̬
			if(strChilddiv==textObj.value){
				arr[0]=objChilddiv[x];
				arr[1]=x;
				objChilddiv[x].style.cssText = 'background-color: #479ff3;color: #ffffff;';
				break;
			}else{
				objChilddiv[x].style.cssText='';
			}
			break;
		}else{
			objChilddiv[x].style.cssText='';
		}
		textObj.focus();
	}

	return arr;
}


//���·�
function downOrUp(textObj,selectDivObj,noteDivObj,seleObj){

	//�õ�select����������optionѡ������Ӧ�Ĳ�
	var objChilddiv=selectDivObj.getElementsByTagName("div");
	
	if(objChilddiv.length == 0){
		return null;
	}
	var selectedOptionDiv;
	
	var hig = 0;
	if(event.keyCode==38){
		selectedOptionDiv = objChilddiv[objChilddiv.length -1];	
		hig = objChilddiv.length -1;
	}else if(event.keyCode==40){
		selectedOptionDiv = objChilddiv[0];
		hig = 0;
	}else{
		selectedOptionDiv = objChilddiv[0];
	}
	var i=0;
	//�������ѡ������ʽ����ȥ��ԭ������Ϊ��ɫ��ѡ������ʽ
	for(i=0; i < objChilddiv.length; i++){		
	    if (objChilddiv[i].style.backgroundColor == '#479ff3') {
			if(event.keyCode==38){
				if(i != 0){
					selectedOptionDiv = objChilddiv[i - 1];
					hig = i - 1;
				}else{
					selectedOptionDiv = objChilddiv[objChilddiv.length - 1];
					hig = objChilddiv.length -1;
				}				
			}else if(event.keyCode==40){
				if(i != (objChilddiv.length -1)){
					selectedOptionDiv = objChilddiv[i + 1];
					hig = i + 1;
				}else{
					selectedOptionDiv = objChilddiv[0];
					hig = 0;
				}				
			}			
			objChilddiv[i].style.cssText='';			
			break;
		}
	}
	
	//��������¼����������б�ʱ�����б������ı�����ֵͬ��ѡ��ѡ��
	if(i==objChilddiv.length){
		
		//�Զ�ƥ����ģ����λ
		var selectOption = autoMatch_(textObj,selectDivObj);
		
		if(selectOption.length != 0){
			//����ע�Ͳ��е�ѡ�λ��
			setNoteDivObj(textObj,selectOption,selectDivObj,noteDivObj);
			selectedOptionDiv = selectOption[0];
			hig = selectOption[1];
		}
	}
	
	selectDivObj.scrollTop=selectedOptionDiv.offsetHeight*hig;

	//ʹ����ѡ���ı���Ϊ��ɫ����Ϊ��ɫ��ģ��ѡ����ʽ
	selectedOptionDiv.style.cssText = 'background-color: #479ff3;color: #ffffff;'

 	textObj.focus();
 
 	return selectedOptionDiv;
}


//�س�
function enter(textObj,selectDivObj,noteDivObj){
	if(selectDivObj.style.display=='none'){
		return false;
	}	
	
	//�õ�select����������optionѡ������Ӧ�Ĳ�
	var objChilddiv=selectDivObj.getElementsByTagName("div");
	
	if(objChilddiv.length == 0){
		return false;
	}
	var selectedOptionDiv;
	
		
	//�������ѡ������ʽ����ȥ��ԭ������Ϊ��ɫ��ѡ������ʽ
	for(var i=0; i < objChilddiv.length; i++){		
	    if (objChilddiv[i].style.backgroundColor == '#479ff3') {
			textObj.value=(ie)?objChilddiv[i].outerText:objChilddiv[i].textContent;
			//�س�ʱ�൱�ڵ����ĳ��ѡ���ʱ����ѡ���Ϊʧȥ����״̬
			//�ٵ����ı���ʧȥ���㷽��textObjectBlur��ѡ�������
			cursorInSelectDivObj=false;
			textObjectBlur(selectDivObj,noteDivObj);
			break;
		}
	}
}

var regChars = new Array();
regChars[0]=new Array();
regChars[0][0]="$";
regChars[0][1]="\\$";
regChars[1]=new Array();
regChars[1][0]="(";
regChars[1][1]="\\(";
regChars[2]=new Array();
regChars[2][0]=")";
regChars[2][1]="\\)";
regChars[3]=new Array();
regChars[3][0]="*";
regChars[3][1]="\\*";
regChars[4]=new Array();
regChars[4][0]="+";
regChars[4][1]="\\+";
regChars[5]=new Array();
regChars[5][0]=".";
regChars[5][1]="\\.";
regChars[6]=new Array();
regChars[6][0]="[";
regChars[6][1]="\\[";
regChars[7]=new Array();
regChars[7][0]="?";
regChars[7][1]="\\?";
regChars[8]=new Array();
regChars[8][0]="]";
regChars[8][1]="\\]";
regChars[9]=new Array();
regChars[9][0]="^";
regChars[9][1]="\\^";
regChars[10]=new Array();
regChars[10][0]="|";
regChars[10][1]="\\|";
regChars[11]=new Array();
regChars[11][0]="{";
regChars[11][1]="\\{";
regChars[12]=new Array();
regChars[12][0]="}";
regChars[12][1]="\\}";
regChars[13]=new Array();
regChars[13][0]="\\";
regChars[13][1]="\\\\";

//����������ʽ�������ַ�
function replaceReg(str){
		
		//$()*+.[?]^|}{\
		var regStr =/[$()*+.\[?\]^|}{\\]/g;
		
		if(!str.match(regStr)){
			return str;
		}

		var regArr =/./g;
		var valueArr = str.match(regArr);
		var tempStr = "";

		for(var i = 0 ; i < valueArr.length; i++){			
			regStr =/[$()*+.\[?\]^|}{\\]/g;
				
			if(valueArr[i].match(regStr)){			
				valueArr[i] = findByKey(valueArr[i])[1];
			}
			
			tempStr = tempStr + valueArr[i];
		}

		return tempStr;
}

//��ѯ���������ַ�Ҫ�滻�ַ���
function findByKey(key){
	var i = 0;
	for(var i = 0; i < regChars.length; i++){
		if(regChars[i][0]==key){
			return regChars[i];
		}
	}
	if(i == regChars.length ){
		return null;
	}
}

//�����һ������Ԫ���ϰ��س���ʱ�Զ��ύ
function keydownOnSelectInput(){

	if(event.srcElement.type == undefined){
		return;
	}	
	var type = event.srcElement.type.toLowerCase();
	if(event.keyCode!=13 
	|| type=='button' 
	|| type=='submit' 
	|| type=='reset' 
	|| type=='textarea' 
	|| type==''){
		return;
	}
	
	var noteDivObj =document.getElementById(NODE_DIV);
	var selectDivObj =document.getElementById(SELECT_DIV);
	
	if(event.srcElement.nextSibling != null 
	&& event.srcElement.nextSibling.type=='select-one'
	&& selectDivObj.style.display=='inline'){
		
		var objChilddiv=selectDivObj.getElementsByTagName("div");
		var i=0;
		for(i=0; i < objChilddiv.length; i++){		
		    if (objChilddiv[i].style.backgroundColor == '#479ff3') {
				break;
			}
		}
		
		//�ڿ�ѡ�������ı����ϰ��س�ʱ����������б���û��ѡ�����ֱ��������һ����Ԫ��
		if(i == objChilddiv.length){
			cursorInSelectDivObj=false;
			textObjectBlur(selectDivObj,noteDivObj);
			event.keyCode=9;
		}else{
			event.returnValue=false;
		}
		return;
	}
	
		
	var srcForm = event.srcElement.form;

	if(srcForm == undefined || srcForm == null){
			return ;
	}
	
	
	var srcForm = event.srcElement.form;
	var srcElementNext = null;

	var allElems = srcForm.elements;
	for(var i = 0; i < allElems.length; i++){
		if(event.srcElement == allElems[i]){
			if(!isLastElem(allElems,i+1)){					
					event.keyCode=9;
					break;
			}else {				
				if(event.srcElement.type=='select-one'){
					var subButton = findSubmitButton(allElems,i);
					if(subButton !=null){
						subButton.click();
					}				
				}				
			}
		}
	}

}

//�����ύ��ť
function findSubmitButton(allElems,index){
	for(var i = index; i < allElems.length; i++){
			if(allElems[i].type=='submit'){
				return  allElems[i];
			}
	}
	
	return null;
}

//�ж��Ƿ������һ��Ԫ��
function isLastElem(allElems,index){
	
	if(index >=allElems.length || allElems[index].type=="submit" ){		
		return true;
	}
	
	for(var i = index; i < allElems.length; i++){
		var tempObj = allElems[i];
		while(tempObj != window.document.body){
			//�����Ԫ��δ���أ����жϸ�Ԫ���Ƿ�����
			if(tempObj.style.display != 'none'){
				tempObj=tempObj.parentElement;
			}else{
				//�������Ԫ�����أ���ݹ������������Ԫ���Ƿ�����
				return isLastElem(allElems,i+1);	
			}			
		}
		
		//���ĳ����Ԫ�ر���δ���أ����丸Ҳδ���أ��������һ����Ԫ��
		if(tempObj == window.document.body){
			return false;
		}
	}		
}


//�Զ��󶨰����¼�
window.document.onkeydown = keydownOnSelectInput;
window.onresize=function(){
		if(textObject){
			textObject.blur();
		}
}
