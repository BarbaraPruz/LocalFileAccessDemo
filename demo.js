
// global variables - keeping it simple
// These variables are set but the handleFileSelect and handleRead event handlers
let fileSelected="";
let contents="";

function handleFileSelect(evt) {
  let files = evt.target.files; // FileList object 
  let output = "";
  // we only care about the 1st file in the list
  fileSelected = files[0];
  output = `<p><strong>${escape(fileSelected.name)}</strong> ${fileSelected.type || 'n/a'} - ${fileSelected.size} bytes</p>`;
  // update html
  document.getElementById('selected').innerHTML = output;
  document.getElementById('read').style.visibility = "visible";     
}

function handleRead(evt) {
  let reader = new FileReader();
  reader.onload = (function(theFile) {
    return function(e) {
      contents = e.target.result.substr(0,100);
      document.getElementById('contents').innerHTML=contents;
      document.getElementById('save').style.visibility = "visible";
    };
  })(fileSelected);
  reader.readAsText(fileSelected);
}      

function handleSave(evt) {
  var blob = new Blob([contents], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "downloaded-" + fileSelected.name); 
  // Simple Alternative to the general saveAs lib
  //   var element = document.createElement('a');
  //   element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(contents));
  //   element.setAttribute('download', "download.txt");
  //   element.style.display = 'none';
  //   document.body.appendChild(element);
  //   element.click();
  //   document.body.removeChild(element);
  //   console.log("save done")  
} 

document.addEventListener("DOMContentLoaded", (event) => { 
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
    document.getElementById("read").addEventListener("click", handleRead);  
    document.getElementById("save").addEventListener("click", handleSave);          
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }       
});  

 