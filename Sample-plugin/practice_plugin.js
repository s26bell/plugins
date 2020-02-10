var api;

window.practice_plugin = {

    init(rampAPI){
        api=rampAPI;
    },
    
    
}

var myPanel = mapI.panels.create('uniquePanelID');

const allPanels = mapInstance.panels.all;

myPanel.body = '<div> Please Enter your address below </div>';

    
myPanel.element.css({
    top: '0px',
    left: '410px',
    bottom: '50%',
    width: '600px'
  });
  
myPanel.open();

var closeBtn = myPanel.header.closeButton;
/*
var closeBtn = myPanel.header.closeButton;

var toggleBtn = myPanel.header.toggleButton;
*/




