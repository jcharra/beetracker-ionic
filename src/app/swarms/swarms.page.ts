import { JournalService, JournalEntry } from 'src/app/journal.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Swarm, SwarmService } from '../swarm.service';
import { map } from 'rxjs/operators';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';

@Component({
  selector: 'app-swarms',
  templateUrl: './swarms.page.html',
  styleUrls: ['./swarms.page.scss']
})
export class SwarmsPage implements OnInit {
  swarms: Swarm[];
  userId: string;
  lastAction: Map<string, JournalEntry> = new Map();

  constructor(
    private swarmService: SwarmService,
    private journalService: JournalService,
    private alertCtrl: AlertController,
    private loadingController: LoadingController,
    private navController: NavController,
    private push: Push
  ) { }

  async loadSwarms(withSpinner: boolean = true) {
    const loading = await this.loadingController.create({
      message: 'Loading swarms...',
      showBackdrop: true
    });

    if (withSpinner) {
      await loading.present();
    }

    this.swarmService
      .getSwarms()
      .pipe(map((s: Swarm[]) => {
        this.swarms = s;

        this.swarms
          .forEach(sw => {
            this.journalService
              .getEntries(sw.id, 1)
              .subscribe((e: JournalEntry[]) => {
                if (e && e.length > 0) {
                  this.lastAction.set(sw.id, e[0]);
                }
              });
          });

        withSpinner && loading.dismiss();
      }))
      .subscribe();
  }

  ngOnInit(): void {
    this.push.hasPermission()
    .then((res: any) => {
  
      if (res.isEnabled) {
        console.log('We have permission to send push notifications');
      } else {
        console.log('We do not have permission to send push notifications');
      }
  
    });
  }

  migrateJournal() {
    // put migrations here
    console.log('no migration');
  }

  ionViewDidEnter() {
    this.loadSwarms(!this.swarms || this.swarms.length === 0);
  }

  openSwarmDetail(swarmId: string) {
    this.navController.navigateForward('/swarms/view/' + swarmId);
  }

  async createSwarm() {
    const alert = await this.alertCtrl.create({
      header: 'New colony',
      message: 'Give your colony a name',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Choose name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Add colony',
          handler: value => {
            if (value.name.trim()) {

              let newSwarm: Swarm = {
                name: value.name.trim(),
                created: new Date()
              };

              this.swarmService
                .createSwarm(newSwarm)
                .subscribe((result: { name: string }) => {
                  newSwarm.id = result.name;
                  this.swarms.push(newSwarm);
                });
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
