import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import axios from 'axios'


const API_ENDPOINT = "http://129.213.112.100:8080/captain/fund/";

export async function getServerSideProps({params}) {
  const { id } = params;

  const url = `${API_ENDPOINT}${id}`;

  const response = await axios.get(url)
    .then((response) => {
      if (response && response.data) {
        return { success: true, data: response.data }
      } else {
        return { success: false, errorCode: 404 }
      }
    })
    .catch((error) => {
      return { success: false, errorCode: 500 }
    });


  if (!response.success) {
    return { notFound: true }
  }

  return {
    props: { ...response.data },
  }
}

export default function Home(props) {
  const { fund_name, fund_inception_date, fund_manager } = props;


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {fund_name}
        </h1>

        <p className={styles.description}>
          Welcome {fund_manager.fund_manager_name}
        </p>


        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Fund Inception Date</h3>
            <p>{fund_inception_date}</p>
          </div>

          <div className={styles.card}>
            <h3>{fund_manager.fund_manager_name}</h3>
            <p>{fund_manager.fund_manager_birth_date}</p>
            <p>{fund_manager.fund_manager_phone}</p>
            <p>{fund_manager.fund_manager_mail_address}</p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        Rights reserved
      </footer>
    </div>
  )
}
