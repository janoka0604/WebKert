import { Component, OnInit  } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  errorMessage?: string;
  products?: any[];
  constructor(private productsService: ProductsService) { }
  

  ngOnInit() {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  loadImage(imageURL: string){
    this.productsService.getImage(imageURL).subscribe(data =>{
      return data;
      });
  }

  onOrderClick(): void {
    console.log("Nem lehet jelenleg rendelni"); // Display the message in the console
  }
}
