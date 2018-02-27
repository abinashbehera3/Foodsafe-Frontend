import { Component, ElementRef,Injectable, ViewChild, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserMenuService } from './user-menu.service';
import {ColorPickerService, Rgba} from 'ngx-color-picker';
import {
    TreeviewI18n, TreeviewItem, TreeviewConfig, TreeviewHelper, TreeviewComponent,
    TreeviewEventParser, OrderDownlineTreeviewEventParser, DownlineTreeviewItem
} from 'ngx-treeview';
// import {DyanmicMenu} from '../../../calsses/dyanamicmenu';


@Injectable()
export class ProductTreeviewConfig extends TreeviewConfig {
    hasAllCheckBox = true;
    hasFilter = true;
    hasCollapseExpand = false;
    maxHeight = 400;
} 




@Component({
  selector: 'app-configuration',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  providers:[UserMenuService,
  { provide: TreeviewEventParser, useClass: OrderDownlineTreeviewEventParser },
        { provide: TreeviewConfig, useClass: ProductTreeviewConfig }]
})



export class UserMenuComponent implements OnInit {
    @ViewChild(TreeviewComponent) treeviewComponent: TreeviewComponent;
    items: TreeviewItem[];
    rows: string[];


// public dyanmicmenu:DyanmicMenu;


    constructor(
        private service: UserMenuService
    ) { }

    ngOnInit() {
        this.items = this.service.getProducts();
    }
    
    onSelectedChange(downlineItems: DownlineTreeviewItem[]) {
        this.rows = [];
        downlineItems.forEach(downlineItem => {
            const item = downlineItem.item;
            const value = item.value;
            const texts = [item.text];
            let parent = downlineItem.parent;
            console.log('item',item);
            console.log('value',value);
            console.log('texts',texts);
            console.log('parent',parent);
            while (!_.isNil(parent)) {
                texts.push(parent.item.text);
                parent = parent.parent;
            }
            const reverseTexts = _.reverse(texts);
            const row = `${reverseTexts.join(' -> ')} : ${value}`;
            this.rows.push(row);
        });
    }
    removeItem(item: TreeviewItem) {
        let isRemoved = false;
        for (const tmpItem of this.items) {
            if (tmpItem === item) {
                _.remove(this.items, item);
            } else {
                isRemoved = TreeviewHelper.removeItem(tmpItem, item);
                if (isRemoved) {
                    break;
                }
            }
        }

        if (isRemoved) {
            this.treeviewComponent.raiseSelectedChange();
        }
    }
    //values = $event
   /* ngOnInit() {
        this.items = this.service.getBooks();
    }*/


// const MENUITEMS = [
//   {
//     label: '',
//     main: [
//       {
//         state: '',
//         short_label: 'H',
//         name: 'Hazard Analysis',
//         type: 'sub',
//         icon: 'icon-direction-alt',
//         children: [
//           {
//             state: 'riskassessment',
//             name: 'Risk Assessment',
//             type: 'sub',
//           }, {
//             state: 'monitoringdetails',
//             name: 'Monitoring Details',
//             type: 'sub',
//             // children: [
//             //   {
//             //     state: '',
//             //     name: '',
//             //   },
//             //   {
//             //     state: '',
//             //     name: '',
//             //   }
//             // ]
           
//           },

//           ]
//         },
//       ]
//     }
//   ];
//   
     menus =[
    {
        state: "hazardanalysis",
        name: 'Hazard Analysis'
    },
    {
        state: "Risk Assessment",
        name: 'Risk Assessment'
    },
     {
        state: "Monitoring Details",
        name: 'Monitoring Details'
    },
     {
        state: "Supporting Documents ",
        name: 'Supporting Documents '
    },
     {
        state: "Schematics",
        name: 'Schematics'
    },
     {
        state: "Risk Assessment Model",
        name: 'Risk Assessment Model'
    },
     {
        state: "Decision Tree Model",
        name: 'Decision Tree Model'
    },
     {
        state: "Control Model",
        name: 'Control Model'
    },
     {
        state: "Reports",
        name: 'Reports'    
    },
]
  selectedState;

   onSelectionChange(state) {
        this.selectedState = state;
    }




}


// var checkboxes = document.querySelectorAll('input.subOption'),
//     checkall = document.getElementById('option');

// for(var i=0; i<checkboxes.length; i++) {
//   checkboxes[i].onclick = function() {
//     var checkedCount = document.querySelectorAll('input.subOption:checked').length;

//     checkall.checked = checkedCount > 0;
//     checkall.indeterminate = checkedCount > 0 && checkedCount < checkboxes.length;
//   }
// }

// checkall.onclick = function() {
//   for(var i=0; i<checkboxes.length; i++) {
//     checkboxes[i].checked = this.checked;
//   }
// }