import style from './index.module.scss';
import Welcome from './components/welcome';
import Service from './components/service';
import Information from './components/information';

export default function Home() {
  return (
    <div className={style.homePageContainer}>
      <Welcome />
      <Information />
      <Service />
    </div>
  );
}
