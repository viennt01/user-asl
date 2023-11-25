import style from './index.module.scss';
import Welcome from './components/welcome';
import Information from './components/information';
import Service from './components/service';
import Introduce from './components/introduce';

export default function Home() {
  return (
    <div className={style.homePageContainer}>
      <Welcome />
      <Information />
      <Introduce />
      <Service />
    </div>
  );
}
