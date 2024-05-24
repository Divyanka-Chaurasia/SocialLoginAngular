import Swal from "sweetalert2";
class CustomSwal {
  static toast(msg:any) {
    let toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      timer: 3000,
      showConfirmButton: false,
      timerProgressBar: true,
    });
    toast.fire({
      icon: 'error',
      title: msg,
    });
  }

  static toastSuccess(msg:any) {
    let toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      timer: 3000,
      showConfirmButton: false,
      timerProgressBar: true,
    
    });

    toast.fire({
      icon: 'success',
      title: msg,
    });
  }
}

export default CustomSwal;

    