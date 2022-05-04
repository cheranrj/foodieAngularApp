import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  tabIndex = 0;
  loader: boolean = true;
  outletDetail: any = {};
  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRouter.queryParamMap.subscribe((params) => {
      const tab = params.get('tab');
      if (tab === 'orderList') {
        this.tabIndex = 0;
      } else if (tab === 'dispatchList') {
        this.tabIndex = 1;
      }
    })
    this.getDetail();
  }

  getDetail() {
    // const headers: any = {};
    // this.apiService.getOutletDetail(this.outletID, headers).subscribe(
    //   	async (response) => {
    //   		if (response) {
    //         this.outletDetail = response;

    this.outletDetail = {
      phoneNumberArray: ['1234567890', '0987654321', '4587365185'],
      outletName: 'The Big Barbeque',
      emailID: 'a@g.co',
      address: 'no.11 v.o.c street, kandanchavadi',
      outletBio: 'Casual Dining - Andhra, North Indian, South Indian, Chinese',
      state: 'Tamil Nadu',
      city: 'Chennai',
      country: 'India',
      description: 'Fresh Food, Good Quality, Value for Money, Packaging, Taste',
      id: 1,
      pinCode: 1234567,
      outletImage: [
        'https://b.zmtcdn.com/data/pictures/4/19542314/49cf04986f23f6e245143eaed9b11901.jpg?output-format=webp&fit=around|771.75:416.25&crop=771.75:416.25;*,*',
        'https://b.zmtcdn.com/data/pictures/chains/2/19282432/a89232ae67ebc2c9eba00bd0a0327b59.jpeg?fit=around%7C450%3A450&crop=450%3A450%3B-3%2C192',
        'https://b.zmtcdn.com/data/pictures/chains/4/19542314/d1d46c9e184b2ecf705d509b2597aba6.jpg?output-format=webp&fit=around|300:273&crop=300:273;*,*'
      ]
    };
    console.log(this.outletDetail)


    // 		}
    // 	},
    // 	(error) => {
    // 		// this.gfService.formErrorHandler(error, this.formObjectData.form);
    // 	}
    // )
    // 	.add(() => {
    this.loader = false;
    // 	});
  }

  tabChange(index: number) {
    if (index === 0) {
      this.setQueryParams('orderList');
    } else if (index === 1) {
      this.setQueryParams('dispatchList');
    }
  }

  setQueryParams(tab) {
    const queryParams = {
      tab,
      limit: null,
      pageNumber: null
    };
    this.router.navigate([], { relativeTo: this.activatedRouter, queryParamsHandling: 'merge', queryParams });
  }

}
