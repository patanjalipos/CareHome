import { Injectable } from "@angular/core";
import { UnsubscriberContainerComponent } from "./utility/unsubscriber-container/unsubscriber-container.component";

@Injectable()
export class AppComponentBase {
  unsubscribe = new UnsubscriberContainerComponent();

  ngOnDestroy() {
    this.unsubscribe.dispose();
  }
  
  dateRangeValidation(fromDate, toDate, validationdays): boolean {
    var days = Math.floor((toDate - fromDate) / (1000 * 60 * 60 * 24)) // Convert milliseconds to days
    if (days <= validationdays)
      return true;
    else
      return false;

  }
  validateNumber(event) {

    const pattern = /[0-9]/g;
    const keyCode = event.keyCode;
    const excludedKeys = [8, 37, 39, 46];
    if (!event.key.match(pattern) || (excludedKeys.includes(keyCode))) {
        event.preventDefault();
    }
}
validateText(event) {

    const pattern = /[A-Za-z\s]/g;
    const keyCode = event.keyCode;
    const excludedKeys = [8, 37, 39, 46];
    if (!event.key.match(pattern) || (excludedKeys.includes(keyCode))) {
        event.preventDefault();
    }
}
validateFloat(event) {
    var charCode = event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46)
        return false;
    else {
        var len = event.target.value.length;
        var index = event.target.value.indexOf('.');

        if (index > 0 && charCode == 46) {
            return false;
        }
        if (index > 0) {
            var CharAfterdot = (len + 1) - index;
            if (CharAfterdot > 3) {
                return false;
            }
        }
    }
    return true;
}
validateTextNumeric(event) {

    const pattern = /[A-Za-z0-9\s]/g;
    const keyCode = event.keyCode;
    const excludedKeys = [8, 37, 39, 46];
    if (!event.key.match(pattern) || (excludedKeys.includes(keyCode))) {
        event.preventDefault();
    }
}

validateBP(event) {
    var charCode = event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 47)
      return false;
    else {
      var len = event.target.value.length;
      var index = event.target.value.indexOf('/');
      if (charCode == 47 && (len < 2 || len > 3))
        return false;
      if (index > 0 && charCode == 47) {
        return false;
      }
      if (index > 0) {
        var CharAfterdot = (len + 1) - index;
        if (CharAfterdot > 4) {
          return false;
        }
      }
    }
    return true;
  }
  // Validate Function End

}
 
