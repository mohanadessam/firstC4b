import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase ,AngularFireList } from 'angularfire2/database';
import { CallNumber } from '@ionic-native/call-number';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


/**
 * Generated class for the ShowRequiredPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-required',
  templateUrl: 'show-required.html',
})
export class ShowRequiredPage {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams , db:AngularFireDatabase
  ,private callNumber: CallNumber ) {

      this.itemsRef = db.list('/required', ref => ref.orderByChild('decs'))
      
      this.items = this.itemsRef.snapshotChanges().map(changes => {
        return changes.map(c => ({ 
          key: c.payload.key,
           name:c.payload.val().name,
           bloodtype:c.payload.val().bloodtype,
           age:c.payload.val().age,
           notes:c.payload.val().notes,
           location:c.payload.val().location,
           phone:c.payload.val().phone,
            time:c.payload.val().time
           })
        );
      });
  
  }
  delete(){
    alert("delete")
  }
call(phone){
  this.callNumber.callNumber(phone , true)
  .then(() => console.log('Launched dialer!'))
  .catch(() => console.log('Error launching dialer'));
}
  

}
