import React from 'react';
import '../Styles/About.css';
import { motion } from 'framer-motion';
import SideMenu from './Side-Menu';

function Aboutpage() {

    return ( 
        <div className="about-page">
            <section className="about-sect">
                <div className="abt-title">
                    About
                </div>
                <div className="about-content">
                    <article className="absectcont">
                        <div className="absecttitle">Stats</div>
                        <section className="absectobj-content">
                            <div className="absectobj-obj">
                                <motion.svg
                                    className="svg-cont"
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <motion.circle
                                        className="abscircle1"
                                    >
                                    </motion.circle>
                                </motion.svg>
                                <div className="obj-cont">
                                    <div className="obj-cont-num">3M</div>
                                    <div className="obj-cont-head">User</div>
                                </div>
                            </div>
                            <div className="absectobj-obj">
                            <motion.svg
                                    className="svg-cont"
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <motion.circle
                                        className="abscircle2"
                                    >
                                    </motion.circle>
                                </motion.svg>
                                <div className="obj-cont">
                                    <div className="obj-cont-num">1K</div>
                                    <div className="obj-cont-head">Books</div>
                                </div>
                            </div>
                            <div className="absectobj-obj">
                            <motion.svg
                                    className="svg-cont"
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <motion.circle
                                        className="abscircle3"
                                    >
                                    </motion.circle>
                                </motion.svg>
                                <div className="obj-cont">
                                    <div className="obj-cont-num">27</div>
                                    <div className="obj-cont-head">Acers</div>
                                </div>
                            </div>
                        </section>
                    </article>
                    <article className="absectcont">
                        <div className="absecttitle">News and Updates</div>
                        <section className="absectnews-content">
                            <ul className="absectnews-list">
                                <li className="absectnews-listitem">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, itaque reprehenderit nesciunt aperiam iusto ratione omnis a veniam provident quos.</li>
                                <li className="absectnews-listitem">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni laborum facere voluptatum ab, quos a, natus libero tenetur temporibus ipsam veritatis dolore illo quod placeat, officia eveniet magnam architecto quae.</li>
                                <li className="absectnews-listitem">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores, animi?</li>
                                <li className="absectnews-listitem">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod possimus cupiditate nihil libero esse obcaecati, maiores soluta voluptatum, consectetur eaque expedita non omnis provident impedit perferendis cumque at deserunt! Magnam, at error ducimus ad exercitationem tenetur hic asperiores autem. Excepturi in iste animi minima sapiente, voluptatum corporis libero blanditiis laudantium!</li>
                            </ul>
                        </section>
                    </article>
                    <article className="absectcont">
                        <div className="absecttitle">History</div>
                        <section className="absectpara-content">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo molestias placeat commodi delectus, numquam tempore quibusdam voluptas rem ex non. Consectetur, tempora saepe assumenda nisi hic cum et, consequuntur doloremque at praesentium vero atque ratione nihil velit voluptates! Maiores tempora distinctio, aspernatur deserunt nam, minima, aliquid minus illo aperiam fugit vitae alias mollitia corporis harum provident dolorem accusamus tenetur assumenda modi voluptatibus odio. Non eligendi consectetur officiis cupiditate pariatur consequatur magni neque sit illo sed hic eveniet ipsam iusto obcaecati sint, natus nobis culpa blanditiis tempora nisi dolor expedita! Unde voluptates voluptatibus est distinctio deleniti ad, ratione similique! Eum veritatis dicta est expedita impedit laudantium nam quam eveniet quidem omnis eaque dolorem nisi voluptates incidunt non, nostrum consequuntur, temporibus modi tempore architecto. Ratione illo ducimus ipsa accusamus iste, doloribus sequi asperiores, quis tenetur praesentium porro optio distinctio debitis excepturi atque veritatis consectetur, placeat nisi dolores obcaecati nobis ut! Dicta quaerat esse, repellat ad maxime reprehenderit enim, sed sit ipsam non quisquam consequuntur omnis eaque! Autem doloremque provident eos, laborum perspiciatis architecto assumenda? Earum corporis deleniti incidunt illum minima. Hic aliquam labore tempora ullam nobis, ipsa blanditiis excepturi velit, provident obcaecati atque ipsum ipsam fugit amet odit praesentium qui delectus nihil?
                        </section>
                    </article>
                    <article className="absectcont">
                        <div className="absecttitle">Current State</div>
                        <section className="absectpara-content">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo molestias placeat commodi delectus, numquam tempore quibusdam voluptas rem ex non. Consectetur, tempora saepe assumenda nisi hic cum et, consequuntur doloremque at praesentium vero atque ratione nihil velit voluptates! Maiores tempora distinctio, aspernatur deserunt nam, minima, aliquid minus illo aperiam fugit vitae alias mollitia corporis harum provident dolorem accusamus tenetur assumenda modi voluptatibus odio. Non eligendi consectetur officiis cupiditate pariatur consequatur magni neque sit illo sed hic eveniet ipsam iusto obcaecati sint, natus nobis culpa blanditiis tempora nisi dolor expedita! Unde voluptates voluptatibus est distinctio deleniti ad, ratione similique! Eum veritatis dicta est expedita impedit laudantium nam quam eveniet quidem omnis eaque dolorem nisi voluptates incidunt non, nostrum consequuntur, temporibus modi tempore architecto. Ratione illo ducimus ipsa accusamus iste, doloribus sequi asperiores, quis tenetur praesentium porro optio distinctio debitis excepturi atque veritatis consectetur, placeat nisi dolores obcaecati nobis ut! Dicta quaerat esse, repellat ad maxime reprehenderit enim, sed sit ipsam non quisquam consequuntur omnis eaque! Autem doloremque provident eos, laborum perspiciatis architecto assumenda? Earum corporis deleniti incidunt illum minima. Hic aliquam labore tempora ullam nobis, ipsa blanditiis excepturi velit, provident obcaecati atque ipsum ipsam fugit amet odit praesentium qui delectus nihil?
                        </section>
                    </article>
                    <article className="absectcont">
                        <div className="absecttitle">FAQs</div>
                        <details className="absectfaq-content">
                            <summary className='absectfaq-ques'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam delectus incidunt reprehenderit eum iste ad labore sit sed quidem dignissimos.</summary>
                            <p className='absectfaq-ans'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere sapiente expedita nam magnam officiis maxime esse laborum velit. Culpa assumenda sunt consectetur laudantium inventore pariatur, rem voluptatum, sit modi iure provident. Recusandae quod nisi quasi eaque sint voluptatum beatae id vitae, quaerat est repellat. Ullam itaque fugiat fuga modi delectus!</p>
                        </details>
                        <details className="absectfaq-content">
                            <summary className='absectfaq-ques'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam delectus incidunt reprehenderit eum iste ad labore sit sed quidem dignissimos.</summary>
                            <p className='absectfaq-ans'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere sapiente expedita nam magnam officiis maxime esse laborum velit. Culpa assumenda sunt consectetur laudantium inventore pariatur, rem voluptatum, sit modi iure provident. Recusandae quod nisi quasi eaque sint voluptatum beatae id vitae, quaerat est repellat. Ullam itaque fugiat fuga modi delectus!</p>
                        </details>
                        <details className="absectfaq-content">
                            <summary className='absectfaq-ques'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam delectus incidunt reprehenderit eum iste ad labore sit sed quidem dignissimos.</summary>
                            <p className='absectfaq-ans'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere sapiente expedita nam magnam officiis maxime esse laborum velit. Culpa assumenda sunt consectetur laudantium inventore pariatur, rem voluptatum, sit modi iure provident. Recusandae quod nisi quasi eaque sint voluptatum beatae id vitae, quaerat est repellat. Ullam itaque fugiat fuga modi delectus!</p>
                        </details>
                    </article>
                </div>
            </section>
            <div className="dashed-box d1"></div>
            <div className="draft-box d4">
                <div className="draftblue-box"></div>
            </div>
            <div className="dotted-box d3"></div>
            <div className="dashed-box d2"></div>
        </div>
     );
}

export default Aboutpage;