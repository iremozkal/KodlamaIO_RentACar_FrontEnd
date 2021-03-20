import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})

export class CarDetailComponent implements OnInit {
  car: Car;
  carImages: CarImage[] = [];
  imageBaseUrl = "https://localhost:44342/";

  constructor(
    private carDetailService: CarDetailService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["id"]) {
        this.getCarDetail(params["id"])
        this.getCarImagesByCarId(params["id"])
      }
    })
  }

  getCarDetail(id: number) {
    this.carDetailService.getCarDetail(id).subscribe(response => {
      this.car = response.data[0];
    })
  }

  getCarImagesByCarId(id: number) {
    this.carImageService.getCarImagesByCarId(id).subscribe(response => {
      this.carImages = response.data;
    })
  }
}
