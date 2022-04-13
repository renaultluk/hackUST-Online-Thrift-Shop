import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Thriftee | Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.hero}>
          Welcome to <span className={styles.companyTitle}>thriftee</span>
          <span className={styles.subtitle}> Your easy donating service</span>
          <div className={styles.buttonsDiv}>
            <a href="/login" className={styles.signupButton}>Join Now</a>
            <a href="/donate" className={styles.signupButton}>Donate</a>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.shopCategories}>
          <h2 className={styles.categoryTitle}>Shop Categories</h2>
          <div className={styles.categoriesDiv}>
            
          <a href="/market?category=women" className={styles.categoryDiv}>
              <div className={styles.categoryImageDiv}>
                <img className={styles.categoryImage} src='https://bigmapapparel.com/wp-content/uploads/2020/08/HTB1L54PX6b.heNjSZFAq6AhKXXad.jpg' />
              </div>
              <p className={styles.categoryName}>Women</p>
            </a>


            <a href="/market?category=men" className={styles.categoryDiv}>
              <div className={styles.categoryImageDiv}> 
                <img className={styles.categoryImage} src='https://cdn.shopify.com/s/files/1/0561/1238/2135/products/6-1623310995717_460x.jpg?v=1626426772' />
              </div>
              <p className={styles.categoryName}>Men</p>
            </a>

            <a href="/market?category=kids" className={styles.categoryDiv}>
              <div className={styles.categoryImageDiv}>
                <img className={styles.categoryImage} src='https://5.imimg.com/data5/SELLER/Default/2020/9/KK/WE/FQ/37262215/25-1-500x500.PNG' />
              </div>
              <p className={styles.categoryName}>Kids</p>
            </a>

          </div>
        </div>
      </main>
    </div>
  )
}
