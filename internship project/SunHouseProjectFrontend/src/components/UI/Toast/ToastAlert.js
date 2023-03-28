import Swal from 'sweetalert2'

export const ToastAlert = ({ toast, timer, background, color, position, icon, iconColor, title }) =>
  Swal.mixin({
    toast: toast || true,
    timer: timer || 2000,
    timerProgressBar: true,
    showConfirmButton: false,
    background: background || 'rgba(0,0,0,0.90)',
    color: color || icon === 'success' ? '#ADFA00' : '#FF3B30',
    position: position || 'bottom-right',
    icon: icon || '',
    iconColor: iconColor || icon === 'success' ? '#ADFA00' : '#FF3B30',
    title: title || '',
  }).fire()
