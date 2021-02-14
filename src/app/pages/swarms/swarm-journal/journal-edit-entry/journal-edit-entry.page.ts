import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { IonSelect, NavController, PickerController } from "@ionic/angular";
import { JournalService } from "src/app/services/journal.service";
import { Countable, CountableForEntryType } from "src/app/types/Countable";
import { actionsForType, EntryType } from "src/app/types/EntryType";
import { JournalEntry } from "src/app/types/JournalEntry";

@Component({
  selector: "app-journal-edit-entry",
  templateUrl: "./journal-edit-entry.page.html",
  styleUrls: ["./journal-edit-entry.page.scss"],
})
export class JournalEditEntryPage implements OnInit, AfterViewInit {
  swarmId: string;
  entryId: string;
  type: string;
  typeOptions: EntryType[];
  actionType: EntryType;
  entryForm: FormGroup;
  saving = false;
  countable: Countable;
  @ViewChild("actionSelect", { static: false }) selectRef: IonSelect;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private journalService: JournalService,
    private navCtrl: NavController,
    private pickerController: PickerController
  ) {}

  ngOnInit() {
    this.swarmId = this.route.snapshot.params.swarmId;
    this.entryId = this.route.snapshot.queryParams.entryId;
    this.type = this.route.snapshot.queryParams.type;

    this.typeOptions = this.type
      ? actionsForType[this.type]
      : Object.values(EntryType);

    this.entryForm = this.formBuilder.group({
      actionType: [null, Validators.required],
      date: [new Date().toISOString(), Validators.required],
      amount: [0],
      text: [""],
    });

    if (this.entryId) {
      this.journalService
        .getEntry(this.swarmId, this.entryId)
        .subscribe((entry: JournalEntry) => {
          this.entryForm.controls.actionType.setValue(
            entry.type ? entry.type.toString() : null
          );
          this.entryForm.controls.text.setValue(entry.text || "");
          this.entryForm.controls.amount.setValue(entry.amount || "");
          if (entry.date) {
            this.entryForm.controls.date.setValue(
              new Date(entry.date).toISOString()
            );
          }
          this.onActionTypeChange();
        });
    }
  }

  save() {
    if (this.saving) {
      return;
    }

    this.saving = true;
    const entry: JournalEntry = {
      type: this.entryForm.get("actionType").value,
      date: this.entryForm.get("date").value,
      text: this.entryForm.get("text").value,
      amount: this.entryForm.get("amount").value,
    };

    if (this.entryId) {
      entry.id = this.entryId;
      this.journalService
        .updateEntry(this.swarmId, entry)
        .subscribe(this.onSuccessfullySaved.bind(this));
    } else {
      this.journalService
        .createEntry(this.swarmId, entry)
        .subscribe(this.onSuccessfullySaved.bind(this));
    }
  }

  onSuccessfullySaved() {
    this.navCtrl.back();
  }

  ngAfterViewInit() {
    if (this.selectRef && !this.entryId) {
      this.selectRef.open();
    }
  }

  async openAmountPicker() {
    const picker = await this.pickerController.create({
      columns: this.getAmountOptions(),
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Confirm",
          handler: (value) => {
            this.entryForm.controls.amount.setValue(+value.amount.value || 0);
          },
        },
      ],
    });

    await picker.present();
  }

  getAmountOptions() {
    const options = [];

    if (!this.countable) {
      return options;
    }

    for (
      let i = this.countable.lowerBound;
      i <= this.countable.upperBound;
      i += this.countable.stepWidth
    ) {
      options.push({
        text:
          i +
          " " +
          (i === 1 ? this.countable.unitSingular : this.countable.unit),
        value: i,
      });
    }

    return [{ name: "amount", options }];
  }

  onActionTypeChange() {
    const e = this.entryForm.controls.actionType.value as EntryType;
    this.countable = CountableForEntryType.get(e);
  }

  onCancel() {
    this.navCtrl.back();
  }
}