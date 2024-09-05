import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Sửa thành styleUrls
})
export class AppComponent {
  title = 'video-call';
  
  @ViewChild('videoElement') videoElement: ElementRef | undefined;
  localStream: MediaStream | null = null;

  startVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((stream) => {
        this.localStream = stream; // Gán stream vào localStream
        if (this.videoElement) {
          this.videoElement.nativeElement.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error('Error accessing camera: ', error);
        alert('Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập hoặc thiết bị.');
      });
  }

  stopVideo() {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      if (this.videoElement) {
        this.videoElement.nativeElement.srcObject = null;
      }
      this.localStream = null;
    } else {
      console.warn('No active stream to stop.');
    }
  }
}
