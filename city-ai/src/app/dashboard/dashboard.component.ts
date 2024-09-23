// dashboard.component.ts
import { Component } from '@angular/core';

interface Ticket {
  id: number;
  title: string;
  status: 'Active' | 'Resolved';
  description: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  tickets: Ticket[] = [
    { id: 1, title: 'Issue 1', status: 'Active', description: 'Description for issue 1' },
    { id: 2, title: 'Issue 2', status: 'Resolved', description: 'Description for issue 2' },
    { id: 3, title: 'Issue 3', status: 'Active', description: 'Description for issue 3' },
  ];
  
  totalIncidentsReported: number = this.tickets.length;
  totalIncidentsResolved: number = this.tickets.filter(t => t.status === 'Resolved').length;
  activeTickets: Ticket[] = this.tickets.filter(t => t.status === 'Active');
  
  chartData = {
    labels: ['Reported', 'Resolved'],
    datasets: [{
      data: [this.totalIncidentsReported, this.totalIncidentsResolved],
      backgroundColor: ['#36A2EB', '#FF6384'],
    }]
  };

  searchTerm: string = '';

  get filteredTickets() {
    return this.activeTickets.filter(ticket => 
      ticket.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  closeTicket(ticket: Ticket) {
    ticket.status = 'Resolved';
    this.totalIncidentsResolved++;
    this.activeTickets = this.activeTickets.filter(t => t.id !== ticket.id);
  }
}
