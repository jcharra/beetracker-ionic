import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Swarm, SwarmService } from '../../swarm.service';
import { JournalEntry, JournalService } from '../../journal.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-swarm-detail',
  templateUrl: './swarm-detail.page.html',
  styleUrls: ['./swarm-detail.page.scss']
})
export class SwarmDetailPage implements OnInit {
  swarm: Swarm;
  journalEntries: JournalEntry[];
  userId: string;

  constructor(
    private swarmService: SwarmService,
    private journalService: JournalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const swarmId = this.route.snapshot.params.swarmId;
    this.userId = this.route.snapshot.data.userId;

    this.swarmService
      .getSwarm(swarmId)
      .subscribe((s: Swarm) => { 
        this.swarm = s;
      });
    
    this.journalService
      .getEntries(swarmId, 3)
      .subscribe((entries: JournalEntry[]) => { 
        this.journalEntries = entries;
      });
  }
}
