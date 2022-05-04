import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/components/popup/popup.component';
import { GlobalFunctionService } from 'src/app/system/services/global-function.service';
import { ManageOutletComponent } from '../manage-outlet/manage-outlet.component';
import { ApiService } from '../utilities/services/api.service';

export interface ContentImageCard {
  title: string;
  shortInfo: any;
  imageSrc: any;
}
@Component({
  selector: 'app-outlet-list',
  templateUrl: './outlet-list.component.html',
  styleUrls: ['./outlet-list.component.scss']
})
export class OutletListComponent implements OnInit {

  loader: boolean = false;
  outletList: Array<ContentImageCard | any> = [];
  currentUser: any;
  constructor(
    private popup: MatDialog,
    private apiService: ApiService,
    public gfService: GlobalFunctionService,
  ) { }

  ngOnInit(): void {
    this.outletList.push({
      title: 'The Big Barbeque',
      imageSrc: 'https://b.zmtcdn.com/data/pictures/chains/2/19282432/a89232ae67ebc2c9eba00bd0a0327b59.jpeg?fit=around%7C450%3A450&crop=450%3A450%3B-3%2C192',
      shortInfo: ['North Indian, Street Food, Desserts, BBQ', 'chennai'],
      phoneNumberArray: ['1234567890', '0987654321', '4587365185'],
      outletName: 'The Big Barbeque',
      emailID: 'a@g.co',
      address: 'aaaaaaa',
      description: 'Fresh Food, Good Quality, Value for Money, Packaging, Taste',
      state: 1,
      city: 1,
      country: 1,
      id: 1,
      pinCode: 1234567,
      outletImage: 'https://b.zmtcdn.com/data/pictures/chains/2/19282432/a89232ae67ebc2c9eba00bd0a0327b59.jpeg?fit=around%7C450%3A450&crop=450%3A450%3B-3%2C192',

    },
      {
        title: 'Dhaba Estd',
        imageSrc: 'https://b.zmtcdn.com/data/pictures/3/18423043/41929c9be12f60b3f35a4d33a71c22ff.jpg?fit=around%7C450%3A450&crop=450%3A450%3B-5%2C-3',
        shortInfo: ['North Indian, Street Food, Desserts, BBQ', 'chennai'],
        phoneNumberArray: ['1234567890', '0987654321', '4587365185'],
        outletName: 'The Big Barbeque',
        emailID: 'a@g.co',
        address: 'aaaaaaa',
        description: 'Fresh Food, Good Quality, Value for Money, Packaging, Taste',
        state: 1,
        city: 1,
        country: 1,
        id: 1,
        pinCode: 1234567,
        outletImage: 'https://b.zmtcdn.com/data/pictures/chains/2/19282432/a89232ae67ebc2c9eba00bd0a0327b59.jpeg?fit=around%7C450%3A450&crop=450%3A450%3B-3%2C192'
      },
      {
        title: 'Delhi Highway',
        imageSrc: 'https://b.zmtcdn.com/data/pictures/chains/5/67605/18a669302240909f50606fe0a9d204c4.jpeg?fit=around%7C450%3A450&crop=450%3A450%3B-2%2C196',
        shortInfo: ['North Indian, Street Food, Desserts, BBQ', 'chennai'],
        phoneNumberArray: ['1234567890', '0987654321', '4587365185'],
        outletName: 'The Big Barbeque',
        emailID: 'a@g.co',
        address: 'aaaaaaa',
        description: 'Fresh Food, Good Quality, Value for Money, Packaging, Taste',
        state: 1,
        city: 1,
        country: 1,
        id: 1,
        pinCode: 1234567,
        outletImage: 'https://b.zmtcdn.com/data/pictures/chains/2/19282432/a89232ae67ebc2c9eba00bd0a0327b59.jpeg?fit=around%7C450%3A450&crop=450%3A450%3B-3%2C192'
      },
      {
        title: 'Delhi Highway',
        imageSrc: 'https://b.zmtcdn.com/data/pictures/chains/5/67605/18a669302240909f50606fe0a9d204c4.jpeg?fit=around%7C450%3A450&crop=450%3A450%3B-2%2C196',
        shortInfo: ['North Indian, Street Food, Desserts, BBQ', 'chennai'],
        phoneNumberArray: ['1234567890', '0987654321', '4587365185'],
        outletName: 'The Big Barbeque',
        emailID: 'a@g.co',
        address: 'aaaaaaa',
        description: 'Fresh Food, Good Quality, Value for Money, Packaging, Taste',
        state: 1,
        city: 1,
        country: 1,
        id: 1,
        pinCode: 1234567,
        outletImage: 'https://b.zmtcdn.com/data/pictures/chains/2/19282432/a89232ae67ebc2c9eba00bd0a0327b59.jpeg?fit=around%7C450%3A450&crop=450%3A450%3B-3%2C192'
      },
      {
        title: 'Delhi Highway',
        imageSrc: 'https://b.zmtcdn.com/data/pictures/chains/5/67605/18a669302240909f50606fe0a9d204c4.jpeg?fit=around%7C450%3A450&crop=450%3A450%3B-2%2C196',
        shortInfo: ['North Indian, Street Food, Desserts, BBQ', 'chennai'],
        phoneNumberArray: ['1234567890', '0987654321', '4587365185'],
        outletName: 'The Big Barbeque',
        emailID: 'a@g.co',
        address: 'aaaaaaa',
        description: 'Fresh Food, Good Quality, Value for Money, Packaging, Taste',
        state: 1,
        city: 1,
        country: 1,
        id: 1,
        pinCode: 1234567,
        outletImage: 'https://b.zmtcdn.com/data/pictures/chains/2/19282432/a89232ae67ebc2c9eba00bd0a0327b59.jpeg?fit=around%7C450%3A450&crop=450%3A450%3B-3%2C192'
      }
    );
    // this.outletList = [];
    console.log(this.outletList)
    console.log(this.gfService.sessionUser)
    this.currentUser = this.gfService.sessionUser;

  }

  getDishList() {
    this.loader = true;
    const apiData: any = {
    };

    // const headers: any = {};
    // this.apiService.getOutletList(apiData, headers).subscribe(
    //   (response) => {
    //     this.dishList = [];
    //     if (response && response.records.length) {
    // this.dataBuild(this.outletList);
    //     }
    //   },
    //   (error) => {
    //     this.dishList = [];
    //   }
    // )
    //   .add(() => {
    this.loader = false;
    // });
  }

  addOutletForm(action: string, additionalInfo: any = {}) {

    const componentData = [
      {
        variableName: 'action',
        value: action
      }
    ];
    if (action === 'editOutlet' && additionalInfo.data) {
      componentData.push({
        variableName: 'outletDetail',
        value: additionalInfo.data
      });
    }
    const dialogRef = this.popup.open(PopupComponent, {
      panelClass: ['custom-panel'],
      data: {
        action: 'dynamic',
        popup: true,
        component: ManageOutletComponent,
        componentData,
        triggerEl: additionalInfo.actionElement
      },
      disableClose: true,
      maxWidth: '860px'
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && typeof result === 'object') {
        console.log(result)
        if (action === 'addOutlet') {
          result.id = result.recordID;
          this.dataBuild(action, [result]);
        } else if (action === 'editOutlet') {
          result.id = result.recordID;
          this.dataBuild(action, [result], additionalInfo);
          // this.outletList[additionalInfo.index] = this.manageOutletData(result);
        }
      }
    });
  }

  outLetDetail(record) {
    const params: any = {
      outletID: record.id
    };
    if (this.currentUser.loginType.key === 'customer') {
      params.tab = 'dish';
    }
    this.gfService.routeNavigation('restaurant/outletDetail', params);

  }


  dataBuild(action: string, records: any, additionalInfo: any = {}) {
    for (const data of records) {

      const cardData: ContentImageCard = {
        title: data.outletName,
        imageSrc: data.outletImage,
        shortInfo: []
      };
      const extraJson: any = {};

      if (data.phoneNumberArray.length) {
        const phoneNumberArray = [];
        for (const phoneNumberData of data.phoneNumberArray) {
          phoneNumberArray.push(phoneNumberData.phoneNumber);
        }
        data.phoneNumberArray = phoneNumberArray;
      }

      if (data.address) {
        cardData.shortInfo.push(data.address);
      }
      if (data.city) {
        cardData.shortInfo.push(data.city);
      }

      const outletData = this.gfService.JSONMerge(data, cardData);
      if (action === 'addOutlet') {
        this.outletList.unshift(outletData);
      } else if (action === 'editOutlet') {
        this.outletList[additionalInfo.index] = outletData;
      }
    }

  }

}
