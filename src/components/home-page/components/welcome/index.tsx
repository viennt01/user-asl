import style from './index.module.scss';

const Welcome = () => {
  return (
    <section className={style.wrapper}>
      <div className={style.heroCover} />
    </section>
  );
};

export default Welcome;
