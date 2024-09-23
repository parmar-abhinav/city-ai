import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-reportissue',
  templateUrl: './reportissue.component.html',
  styleUrls: ['./reportissue.component.css']
})
export class ReportissueComponent {
  
  reportForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  location: { latitude: number; longitude: number } | null = null;

  constructor(private fb: FormBuilder) {
    this.reportForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [null]
    });
  }

  onImageUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.reportForm.patchValue({ image: file });
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  }

  onSubmit(): void {
    if (this.reportForm.valid) {
      const formData = new FormData();
      formData.append('title', this.reportForm.get('title')?.value);
      formData.append('description', this.reportForm.get('description')?.value);
      formData.append('image', this.reportForm.get('image')?.value);
      formData.append('latitude', this.location?.latitude.toString() || '');
      formData.append('longitude', this.location?.longitude.toString() || '');

      // Handle form submission logic here (e.g., send to API)
      console.log('Issue reported:', formData);
    }
  }
}
