import React, { Component } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Flag from 'react-world-flags'

export default class Skaters extends Component {
    constructor(props) {
        super(props);
        this.partnerLink = this.partnerLink.bind(this);
        this.handleQuery = this.handleQuery.bind(this);
        this.handleDiscipline = this.handleDiscipline.bind(this);
        this.handleCountry = this.handleCountry.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.listAthletes = this.listAthletes.bind(this);
        this.state = {
            allAthletes: [],
            athletes: [],
            query: '',
            country: ''
        }
    }

    componentWillMount() {
        let data = require("../data/skaters.json");
        this.setState({
            athletes: data.athletes,
            allAthletes: data.athletes
        });
    }

    partnerLink(partner, e) {
        let partnerLink = 'skaters/' + partner
        window.location.replace(partnerLink)
        e.stopPropagation();
    }

    listAthletes(athlete, index) {
        let link = 'skaters/' + athlete.athlete;
        let partner;
        if (athlete.hasOwnProperty('partner')) {
            if (Array.isArray(athlete.partner)) {
                partner = <div className="partners">
                    partners: &nbsp;
                    {athlete.partner.map((p, index) =>

                    <p className="partner" key={index} onClick={(e) => { this.partnerLink(p, e) }}> {p}  &nbsp; </p>)}
                </div>

            } else {
                partner = <div className="partners">
                    partner: &nbsp;
                    <p className="partner" onClick={(e) => { this.partnerLink(athlete.partner, e) }}> {athlete.partner} </p>
                </div>
            }

        } else {
            partner = null;
        }
        return <tr className = "athleteResults" key={index} onClick={() => window.location.replace(link)} >

            <td className="athleteTD">
                <div className="athleteResult">
                    <div className="picWrapper">
                        <img className="profilePic" src={athlete.img} alt="profile_pic" ></img>
                    </div>
                    <div className="profileWrapper">
                        <p className="athleteName"> {athlete.athlete.toUpperCase()} <Flag className="athleteFlag" code={athlete.countryCode} /> </p>
                        {partner}
                        <p className="athleteDiscipline"> {athlete.discipline.toLowerCase()} </p>
                    </div>
                </div>
            </td>
            <td>
                world standing: {athlete.rank}
            </td>
        </tr>
    }

    handleSort(e) {
        let sort = e.target.value.toLowerCase();
        if (sort === '') {
            this.setState({
                athletes: this.state.allAthletes
            })
        } else {
            this.setState({
                athletes: this.state.allAthletes.concat().sort(this.sort(sort))
            })
        }
    }

    sort(sort) {
        let disciplines = ["men's singles", "ladies' singles", "pairs", "ice dance"]
        sort = sort.split(" ")
        if (sort[0] == "discipline") {
            return function (a, b) {
                console.log(a[sort[0]])
                console.log(b[sort[0]])
                if (disciplines.indexOf(a['discipline']) > disciplines.indexOf(b['discipline'])) {
                    return (sort[1] === 'asc') ? 1 : -1
                } else if (a[sort[0]] < b[sort[0]]) {
                    return (sort[1] === 'asc') ? -1 : 1
                }
                return 0;
            }
        } else {
            console.log(sort[0])
            return function (a, b) {
                console.log(a['athlete'] + a[sort[0]] + " vs " + b['athlete'] + b[sort[0]])
                if (a[sort[0]] > b[sort[0]]) {
                    return (sort[1] === 'asc') ? 1 : -1
                } else if (a[sort[0]] < b[sort[0]]) {
                    return (sort[1] === 'asc') ? -1 : 1
                }else if(disciplines.indexOf(a['discipline']) !== disciplines.indexOf(b['discipline'])){
                    console.log("hello")
                    return (disciplines.indexOf(a['discipline']) > disciplines.indexOf(b['discipline'])) ? 1 : -1
                }
                return 0;
            }
        }
    }

    handleQuery(e) {
        let query = e.target.value.toLowerCase();
        let athletes = this.state.allAthletes.filter((athlete) => athlete.athlete.toLowerCase().includes(query));
        this.setState({
            athletes: athletes
        });
    }

    handleDiscipline(e) {
        let discipline = e.target.value.toLowerCase();
        if (discipline === '') {
            this.setState({
                athletes: this.state.allAthletes
            });
        } else {
            let athletes = this.state.allAthletes.filter((athlete) => athlete.discipline.toLowerCase() === discipline);
            this.setState({
                athletes: athletes
            });
        }
    }

    handleCountry(e) {
        let country = e.target.value.toLowerCase();
        if (country === '') {
            this.setState({
                athletes: this.state.allAthletes
            });
        } else {
            let athletes = this.state.allAthletes.filter((athlete) => athlete.representing.toLowerCase() === country);
            this.setState({
                athletes: athletes
            });
        }
    }

    render() {
        let athletesList = this.state.athletes.map(this.listAthletes);
        return (
            <div>
                <div className="searchSkater">
                    <p className="searchTitle">Find a Figure Skater</p>
                    <Form className="form">
                        <Form.Control className="search" type="text" placeholder="&#61442;" onChange={this.handleQuery} />
                        <Row className="filters">
                            <Col className="col">
                                <Form.Group>
                                    <Form.Control className="formInput" as="select" onChange={this.handleDiscipline} >
                                        <option value="">select discipline</option>
                                        <option value="men's singles"> men's singles</option>
                                        <option value="ladies' singles">ladies' singles</option>
                                        <option value="pairs">pairs</option>
                                        <option value="ice dance">ice dance</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col className="col">
                                <Form.Group>
                                    <Form.Control className="formInput" as="select" onChange={this.handleCountry}>
                                        <option value="">select country representing</option>
                                        <option value="Afghanistan">Afghanistan</option>
                                        <option value="??land Islands">??land Islands</option>
                                        <option value="Albania">Albania</option>
                                        <option value="Algeria">Algeria</option>
                                        <option value="American Samoa">American Samoa</option>
                                        <option value="Andorra">Andorra</option>
                                        <option value="Angola">Angola</option>
                                        <option value="Anguilla">Anguilla</option>
                                        <option value="Antarctica">Antarctica</option>
                                        <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                        <option value="Argentina">Argentina</option>
                                        <option value="Armenia">Armenia</option>
                                        <option value="Aruba">Aruba</option>
                                        <option value="Australia">Australia</option>
                                        <option value="Austria">Austria</option>
                                        <option value="Azerbaijan">Azerbaijan</option>
                                        <option value="Bahamas">Bahamas</option>
                                        <option value="Bahrain">Bahrain</option>
                                        <option value="Bangladesh">Bangladesh</option>
                                        <option value="Barbados">Barbados</option>
                                        <option value="Belarus">Belarus</option>
                                        <option value="Belgium">Belgium</option>
                                        <option value="Belize">Belize</option>
                                        <option value="Benin">Benin</option>
                                        <option value="Bermuda">Bermuda</option>
                                        <option value="Bhutan">Bhutan</option>
                                        <option value="Bolivia">Bolivia</option>
                                        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                        <option value="Botswana">Botswana</option>
                                        <option value="Bouvet Island">Bouvet Island</option>
                                        <option value="Brazil">Brazil</option>
                                        <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                        <option value="Brunei Darussalam">Brunei Darussalam</option>
                                        <option value="Bulgaria">Bulgaria</option>
                                        <option value="Burkina Faso">Burkina Faso</option>
                                        <option value="Burundi">Burundi</option>
                                        <option value="Cambodia">Cambodia</option>
                                        <option value="Cameroon">Cameroon</option>
                                        <option value="Canada">Canada</option>
                                        <option value="Cape Verde">Cape Verde</option>
                                        <option value="Cayman Islands">Cayman Islands</option>
                                        <option value="Central African Republic">Central African Republic</option>
                                        <option value="Chad">Chad</option>
                                        <option value="Chile">Chile</option>
                                        <option value="China">China</option>
                                        <option value="Christmas Island">Christmas Island</option>
                                        <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                                        <option value="Colombia">Colombia</option>
                                        <option value="Comoros">Comoros</option>
                                        <option value="Congo">Congo</option>
                                        <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                                        <option value="Cook Islands">Cook Islands</option>
                                        <option value="Costa Rica">Costa Rica</option>
                                        <option value="Cote D'ivoire">Cote D'ivoire</option>
                                        <option value="Croatia">Croatia</option>
                                        <option value="Cuba">Cuba</option>
                                        <option value="Cyprus">Cyprus</option>
                                        <option value="Czech Republic">Czech Republic</option>
                                        <option value="Denmark">Denmark</option>
                                        <option value="Djibouti">Djibouti</option>
                                        <option value="Dominica">Dominica</option>
                                        <option value="Dominican Republic">Dominican Republic</option>
                                        <option value="Ecuador">Ecuador</option>
                                        <option value="Egypt">Egypt</option>
                                        <option value="El Salvador">El Salvador</option>
                                        <option value="Equatorial Guinea">Equatorial Guinea</option>
                                        <option value="Eritrea">Eritrea</option>
                                        <option value="Estonia">Estonia</option>
                                        <option value="Ethiopia">Ethiopia</option>
                                        <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                                        <option value="Faroe Islands">Faroe Islands</option>
                                        <option value="Fiji">Fiji</option>
                                        <option value="Finland">Finland</option>
                                        <option value="France">France</option>
                                        <option value="French Guiana">French Guiana</option>
                                        <option value="French Polynesia">French Polynesia</option>
                                        <option value="French Southern Territories">French Southern Territories</option>
                                        <option value="Gabon">Gabon</option>
                                        <option value="Gambia">Gambia</option>
                                        <option value="Georgia">Georgia</option>
                                        <option value="Germany">Germany</option>
                                        <option value="Ghana">Ghana</option>
                                        <option value="Gibraltar">Gibraltar</option>
                                        <option value="Greece">Greece</option>
                                        <option value="Greenland">Greenland</option>
                                        <option value="Grenada">Grenada</option>
                                        <option value="Guadeloupe">Guadeloupe</option>
                                        <option value="Guam">Guam</option>
                                        <option value="Guatemala">Guatemala</option>
                                        <option value="Guernsey">Guernsey</option>
                                        <option value="Guinea">Guinea</option>
                                        <option value="Guinea-bissau">Guinea-bissau</option>
                                        <option value="Guyana">Guyana</option>
                                        <option value="Haiti">Haiti</option>
                                        <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                                        <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                                        <option value="Honduras">Honduras</option>
                                        <option value="Hong Kong">Hong Kong</option>
                                        <option value="Hungary">Hungary</option>
                                        <option value="Iceland">Iceland</option>
                                        <option value="India">India</option>
                                        <option value="Indonesia">Indonesia</option>
                                        <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                                        <option value="Iraq">Iraq</option>
                                        <option value="Ireland">Ireland</option>
                                        <option value="Isle of Man">Isle of Man</option>
                                        <option value="Israel">Israel</option>
                                        <option value="Italy">Italy</option>
                                        <option value="Jamaica">Jamaica</option>
                                        <option value="Japan">Japan</option>
                                        <option value="Jersey">Jersey</option>
                                        <option value="Jordan">Jordan</option>
                                        <option value="Kazakhstan">Kazakhstan</option>
                                        <option value="Kenya">Kenya</option>
                                        <option value="Kiribati">Kiribati</option>
                                        <option value="Democratic People's Republic of Korea">Democratic People's Republic of Korea</option>
                                        <option value="Republic of Korea">Republic of Korea </option>
                                        <option value="Kuwait">Kuwait</option>
                                        <option value="Kyrgyzstan">Kyrgyzstan</option>
                                        <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                                        <option value="Latvia">Latvia</option>
                                        <option value="Lebanon">Lebanon</option>
                                        <option value="Lesotho">Lesotho</option>
                                        <option value="Liberia">Liberia</option>
                                        <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                                        <option value="Liechtenstein">Liechtenstein</option>
                                        <option value="Lithuania">Lithuania</option>
                                        <option value="Luxembourg">Luxembourg</option>
                                        <option value="Macao">Macao</option>
                                        <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                                        <option value="Madagascar">Madagascar</option>
                                        <option value="Malawi">Malawi</option>
                                        <option value="Malaysia">Malaysia</option>
                                        <option value="Maldives">Maldives</option>
                                        <option value="Mali">Mali</option>
                                        <option value="Malta">Malta</option>
                                        <option value="Marshall Islands">Marshall Islands</option>
                                        <option value="Martinique">Martinique</option>
                                        <option value="Mauritania">Mauritania</option>
                                        <option value="Mauritius">Mauritius</option>
                                        <option value="Mayotte">Mayotte</option>
                                        <option value="Mexico">Mexico</option>
                                        <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                                        <option value="Moldova, Republic of">Moldova, Republic of</option>
                                        <option value="Monaco">Monaco</option>
                                        <option value="Mongolia">Mongolia</option>
                                        <option value="Montenegro">Montenegro</option>
                                        <option value="Montserrat">Montserrat</option>
                                        <option value="Morocco">Morocco</option>
                                        <option value="Mozambique">Mozambique</option>
                                        <option value="Myanmar">Myanmar</option>
                                        <option value="Namibia">Namibia</option>
                                        <option value="Nauru">Nauru</option>
                                        <option value="Nepal">Nepal</option>
                                        <option value="Netherlands">Netherlands</option>
                                        <option value="Netherlands Antilles">Netherlands Antilles</option>
                                        <option value="New Caledonia">New Caledonia</option>
                                        <option value="New Zealand">New Zealand</option>
                                        <option value="Nicaragua">Nicaragua</option>
                                        <option value="Niger">Niger</option>
                                        <option value="Nigeria">Nigeria</option>
                                        <option value="Niue">Niue</option>
                                        <option value="Norfolk Island">Norfolk Island</option>
                                        <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                        <option value="Norway">Norway</option>
                                        <option value="Oman">Oman</option>
                                        <option value="Pakistan">Pakistan</option>
                                        <option value="Palau">Palau</option>
                                        <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                                        <option value="Panama">Panama</option>
                                        <option value="Papua New Guinea">Papua New Guinea</option>
                                        <option value="Paraguay">Paraguay</option>
                                        <option value="Peru">Peru</option>
                                        <option value="Philippines">Philippines</option>
                                        <option value="Pitcairn">Pitcairn</option>
                                        <option value="Poland">Poland</option>
                                        <option value="Portugal">Portugal</option>
                                        <option value="Puerto Rico">Puerto Rico</option>
                                        <option value="Qatar">Qatar</option>
                                        <option value="Reunion">Reunion</option>
                                        <option value="Romania">Romania</option>
                                        <option value="Russian Federation">Russian Federation</option>
                                        <option value="Rwanda">Rwanda</option>
                                        <option value="Saint Helena">Saint Helena</option>
                                        <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                        <option value="Saint Lucia">Saint Lucia</option>
                                        <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                                        <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                                        <option value="Samoa">Samoa</option>
                                        <option value="San Marino">San Marino</option>
                                        <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                        <option value="Saudi Arabia">Saudi Arabia</option>
                                        <option value="Senegal">Senegal</option>
                                        <option value="Serbia">Serbia</option>
                                        <option value="Seychelles">Seychelles</option>
                                        <option value="Sierra Leone">Sierra Leone</option>
                                        <option value="Singapore">Singapore</option>
                                        <option value="Slovakia">Slovakia</option>
                                        <option value="Slovenia">Slovenia</option>
                                        <option value="Solomon Islands">Solomon Islands</option>
                                        <option value="Somalia">Somalia</option>
                                        <option value="South Africa">South Africa</option>
                                        <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                                        <option value="Spain">Spain</option>
                                        <option value="Sri Lanka">Sri Lanka</option>
                                        <option value="Sudan">Sudan</option>
                                        <option value="Suriname">Suriname</option>
                                        <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                                        <option value="Swaziland">Swaziland</option>
                                        <option value="Sweden">Sweden</option>
                                        <option value="Switzerland">Switzerland</option>
                                        <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                                        <option value="Taiwan, Province of China">Taiwan, Province of China</option>
                                        <option value="Tajikistan">Tajikistan</option>
                                        <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                                        <option value="Thailand">Thailand</option>
                                        <option value="Timor-leste">Timor-leste</option>
                                        <option value="Togo">Togo</option>
                                        <option value="Tokelau">Tokelau</option>
                                        <option value="Tonga">Tonga</option>
                                        <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                        <option value="Tunisia">Tunisia</option>
                                        <option value="Turkey">Turkey</option>
                                        <option value="Turkmenistan">Turkmenistan</option>
                                        <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                                        <option value="Tuvalu">Tuvalu</option>
                                        <option value="Uganda">Uganda</option>
                                        <option value="Ukraine">Ukraine</option>
                                        <option value="United Arab Emirates">United Arab Emirates</option>
                                        <option value="United Kingdom">United Kingdom</option>
                                        <option value="United States">United States</option>
                                        <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                                        <option value="Uruguay">Uruguay</option>
                                        <option value="Uzbekistan">Uzbekistan</option>
                                        <option value="Vanuatu">Vanuatu</option>
                                        <option value="Venezuela">Venezuela</option>
                                        <option value="Viet Nam">Viet Nam</option>
                                        <option value="Virgin Islands, British">Virgin Islands, British</option>
                                        <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                                        <option value="Wallis and Futuna">Wallis and Futuna</option>
                                        <option value="Western Sahara">Western Sahara</option>
                                        <option value="Yemen">Yemen</option>
                                        <option value="Zambia">Zambia</option>
                                        <option value="Zimbabwe">Zimbabwe</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col className="col">
                                <Form.Group>
                                    <Form.Control className="formInput" as="select" onChange={this.handleSort} >
                                        <option value="">sort by</option>
                                        <option value="athlete asc">name: ascending</option>
                                        <option value="athlete desc">name: descending</option>
                                        <option value="rank asc">world standing: ascending</option>
                                        <option value="rank desc">world standing: descending</option>
                                        <option value="discipline asc"> discipline: ascending</option>
                                        <option value="discipline desc"> discipline: descending</option>
                                        <option value="representing asc">country: ascending</option>
                                        <option value="representing desc">country: descending</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>

                    {(this.state.athletes.length !== 0) ?
                        <div className="athleteTable">
                            <table className="table" >
                                <tbody>
                                    {athletesList}
                                </tbody>
                            </table>

                        </div>
                        : <p className="noResults"> sorry, there no skaters were found in this search. please try a different query. </p>
                    }

                </div>
            </div>
        )
    }
}