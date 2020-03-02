// panels template: geolocator
export const INPUT_BOX = `

<div class="" >

    <div class ng-controller="findCtrl as ctrl" id= "box">
        <md-input-container>
            <ngform>
                    <label for="location">{{ 'plugins.geolocator.input' | translate }}</label>
                        <input type = "text"
                            id = "loc"
                            ng-model= "ctrl.address"
                            ng-change= "ctrl.autoComplete()"
            </ngform>
        </md-input-container>
    </div>
          
</div>`;


export const AUTO_SELECT = `

<div class="" > 
    <div class ng-controller="autoCtrl as ctrl" id= "select">
        <md-select
                placeholder = "{{ 'plugins.geolocator.auto' | translate }}"
                ng-model="ctrl.place"
                ng-change= "ctrl.getLoc()"
                <md-select-label>{{ ctrl.item.value }}</md-select-label>
                <md-option ng-repeat="item in ctrl.items" >
                 {{ item.name }}
                </md-option>
        </md-select>

    </div>



</div>`;

