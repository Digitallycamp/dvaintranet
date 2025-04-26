import React from 'react';

function LaunchPad() {
	return (
		<div>
			<div className='container mx-auto px-4 py-10 space-y-16'>
				{/* Slide 1: Welcome */}
				<section className='text-center space-y-4' id='welcome'>
					<h1 className='text-4xl font-bold text-blue-600'>
						Welcome to DVA Bootcamp!
					</h1>
					<p className='text-xl text-gray-700'>
						Your Journey into Tech Starts Here
					</p>
					<p className='text-gray-500'>Instructor: Wisdom</p>
				</section>

				{/* Slide 2: What is Tech? */}
				<section className='space-y-4' id='what-is-tech'>
					<h2 className='text-3xl font-semibold text-purple-600'>
						What is Tech?
					</h2>
					<p className='text-gray-700'>
						Tech is all around you—apps, websites, AI, cloud services. If it
						runs on software, it’s tech.
					</p>
					<ul className='list-disc list-inside text-gray-600 space-y-1'>
						<li>Instagram, Uber, YouTube</li>
						<li>Netflix, Amazon</li>
						<li>Smart devices, AI, Robotics</li>
					</ul>
				</section>

				{/* Slide 3: Tech Jargon */}
				<section className='space-y-4' id='tech-jargon'>
					<h2 className='text-3xl font-semibold text-green-600'>
						Common Tech Jargon
					</h2>
					<div className='overflow-x-auto'>
						<table className='table-auto w-full text-left border border-gray-200'>
							<thead className='bg-gray-100'>
								<tr>
									<th className='p-2 border'>Term</th>
									<th className='p-2 border'>Meaning</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className='p-2 border'>Frontend</td>
									<td className='p-2 border'>What users see & interact with</td>
								</tr>
								<tr>
									<td className='p-2 border'>Backend</td>
									<td className='p-2 border'>
										Behind-the-scenes logic & databases
									</td>
								</tr>
								<tr>
									<td className='p-2 border'>Full Stack</td>
									<td className='p-2 border'>Both frontend and backend</td>
								</tr>
								<tr>
									<td className='p-2 border'>API</td>
									<td className='p-2 border'>
										Messenger between apps & services
									</td>
								</tr>
								<tr>
									<td className='p-2 border'>Cloud</td>
									<td className='p-2 border'>Online data storage & services</td>
								</tr>
								<tr>
									<td className='p-2 border'>Git</td>
									<td className='p-2 border'>
										Tool to manage and track code changes
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</section>

				{/* Slide 4: Tech Ecosystem */}
				<section className='space-y-4' id='tech-ecosystem'>
					<h2 className='text-3xl font-semibold text-blue-700'>
						The Tech Ecosystem
					</h2>
					<ul className='list-disc list-inside text-gray-700 space-y-1'>
						<li>Frontend/Backend Developers</li>
						<li>UI/UX Designers</li>
						<li>QA Testers</li>
						<li>Product Managers</li>
						<li>Data Analysts</li>
						<li>Cybersecurity Experts</li>
					</ul>
				</section>

				{/* Slide 5: Skills You Can Learn */}
				<section className='space-y-4' id='tech-skills'>
					<h2 className='text-3xl font-semibold text-orange-600'>
						Skills You Can Learn
					</h2>
					<div className='overflow-x-auto'>
						<table className='table-auto w-full text-left border border-gray-200'>
							<thead className='bg-gray-100'>
								<tr>
									<th className='p-2 border'>Skill</th>
									<th className='p-2 border'>Tools/Tech Examples</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className='p-2 border'>Web Development</td>
									<td className='p-2 border'>HTML, CSS, JavaScript</td>
								</tr>
								<tr>
									<td className='p-2 border'>UI/UX Design</td>
									<td className='p-2 border'>Figma, Adobe XD</td>
								</tr>
								<tr>
									<td className='p-2 border'>Data Analytics</td>
									<td className='p-2 border'>Excel, SQL, Python</td>
								</tr>
								<tr>
									<td className='p-2 border'>QA Testing</td>
									<td className='p-2 border'>Manual & Automated Tools</td>
								</tr>
								<tr>
									<td className='p-2 border'>Digital Marketing</td>
									<td className='p-2 border'>SEO, Google Analytics</td>
								</tr>
							</tbody>
						</table>
					</div>
					<blockquote className='italic text-gray-500 border-l-4 border-gray-300 pl-4'>
						“You don’t need a degree. You need consistency.”
					</blockquote>
				</section>

				{/* Slide 6: Why Join Tech */}
				<section className='space-y-4' id='why-join-tech'>
					<h2 className='text-3xl font-semibold text-indigo-600'>
						What Makes Tech Amazing
					</h2>
					<ul className='list-disc list-inside text-gray-700 space-y-1'>
						<li>Remote job opportunities</li>
						<li>High demand and good pay</li>
						<li>Global community</li>
						<li>Creativity and innovation</li>
						<li>Anyone can start from anywhere</li>
					</ul>
				</section>

				{/* Slide 7: Your Mission at DVA */}
				<section className='space-y-4' id='mission'>
					<h2 className='text-3xl font-semibold text-pink-600'>
						Your Mission at DVA
					</h2>
					<ul className='list-disc list-inside text-gray-700 space-y-1'>
						<li>Learn by doing</li>
						<li>Collaborate with peers</li>
						<li>Ask questions, stay curious</li>
						<li>Build real-world projects</li>
						<li>Become job-ready</li>
					</ul>
				</section>

				{/* Slide 8: Final Note */}
				<section className='text-center space-y-4' id='final-note'>
					<h2 className='text-3xl font-bold text-green-600'>Let’s Go! 🚀</h2>
					<p className='text-xl text-gray-700'>
						Tech isn’t about being perfect. It’s about learning fast, failing
						forward, and building boldly.
					</p>
					<p className='text-lg text-gray-500'>
						We’re here to guide you every step of the way. Welcome to DVA!
					</p>
				</section>
			</div>
		</div>
	);
}

export default LaunchPad;
