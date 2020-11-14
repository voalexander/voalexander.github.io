var vars = ['a','b','c'] ,expressions = ['! ( a || b || c )', '(!a && !b && !c)'];
var getResult = document.getElementById('getResult')
getResult.addEventListener('click', output);

function output()
{
	var len = vars.length;
	var splitBy = Math.round(len/2);
	var trueSet;
	var trueVals = [];
	var falseVals = [];
	var truthData = [];
	
	vars = document.getElementById('vars').value.split(',');
	expressions = document.getElementById('expression').value.split(',');

	
	truthData.push(truth(vars, vars, true));
	for(var i=1; i<=splitBy; i++) 
	{
		trueSet = reduceToCombinations(permut(vars, i));
		trueSet.forEach((truthSrc)=>
		{
			trueVals = truth(vars, truthSrc);
			truthData.push(trueVals);
		}
		);
	}
	truthData.push(truth(vars, vars));
	
	writeTruthTable(truthData);
}

function truth(set, truths, reverse) 
{
	var truthSet = {};
	
	set.forEach(i => truthSet[i] = (truths.indexOf(i) >= 0 ? true : false) ^ reverse);
	
	return truthSet;
}

function reduceToCombinations(arr) 
{
	var i = 1;
	var finalElement;

	arr = arr.map(j => {return j.split('').sort().join('')}).sort();
	
	finalElement = arr[0];
	while(i<arr.length) 
	{
		if(arr[i] == finalElement) 
		{
			arr.splice(i,1);
		} 
		else 
		{
			finalElement = arr[i];
			i++;
		}
	}
	arr = arr.map(j=>{return j.split('')});
	return arr;
}

function writeTruthTable(truthData) {
	var table = '<table cellpadding=0 cellspacing=0>';
	var keys;
	var vals;
	var exprRes;
		
	table += '<thead><tr>';
	vars.forEach(j =>
	{
		table += '<th>';
		table += j;
		table += '</th>';
	});

	expressions.forEach(j =>
	{
		table += '<th>';
		table += j;
		table += '</th>';
	});

	table += '</tr></thead>';
	
	truthData.forEach((j)=> 
	{
		vals = [];
		keys = [];
		table += '<tr>';
		console.log(j);
		for(i in j)
		{
			vals.push(j[i]);
			keys.push(i);
			table += '<td>';
			table += j[i];
			table += '</td>';
		};
		for(var i = 0; i < keys.length; i++) 
		{
			eval(`var ${keys[i]} = ${vals[i]};`);
		}

		expressions.forEach((expr)=>
		{
			exprRes = eval(expr);
			table += `<td class="${exprRes}">`;
			table += exprRes ? 'T' : 'F';
			table += '</td>';
		});
		
		table += '</tr>';
	});
	
	table += '</table>';
	document.getElementById('result').innerHTML = table;
}

function permut(arr, c) {
	var buf = [];
	var len;
	var arrSlice;
	var permArr;
	var proArr;

	if(c <= 1) 
	{
		return arr;
	} 
	else 
	{
		len = arr.length;
		for(var i=0;i<len;i++) 
		{
			arrSlice = arr.slice(0,i).concat(arr.slice(i+1));
			permArr = permut(arrSlice,c-1);
			proArr = [];
			for(var y=0; y<permArr.length; y++) 
			{
				proArr.push([arr[i]].concat(permArr[y]).join(''));
			}
			buf.push(...proArr);
		}
	}
	return buf;
}