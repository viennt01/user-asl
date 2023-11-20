import style from './index.module.scss';

export default function Booking() {
  return (
    <div className={style.wrapper}>
      <div className={style.oceanFreight} />
      <div className={style.airFreight} />
      <div className={style.truckFreight} />
      <div className={style.customsService} />
    </div>
  );
}
