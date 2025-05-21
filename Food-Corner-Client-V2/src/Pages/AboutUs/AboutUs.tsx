import ReactHelemt from "../../components/common/ReactHelmet/ReactHelemt";
import SectionHeader from "../../components/common/SectionHeader/SectionHeader";

import { Effect } from "../../components/FramerMotion/Effect";

const AboutUs = () => {
  return (
    <>
      <div className="bg-white text-gray-900">
        <ReactHelemt title=": About-Us"></ReactHelemt>
        {/* Header Section */}
        <SectionHeader text="About Us"></SectionHeader>
        <Effect>
          {" "}
          {/* Our Story Section */}
          <section className="container mx-auto px-6 py-12">
            <h2 className="text-3xl font-semibold mb-4 text-orange-400">
              Our Story
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Our food order platform was founded with one goal in mind: to make
              delicious, fresh meals more accessible. Since we started in 2020,
              we’ve been serving customers with the best local cuisines,
              ensuring quality in every bite.
            </p>
            <p className="text-lg text-gray-700">
              What began as a small startup has grown into a community-driven
              platform that helps customers enjoy food from their favorite local
              restaurants, delivered right to their doorstep.
            </p>
          </section>
          {/* Mission and Values Section */}
          <section className=" py-12">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-semibold mb-6 text-center text-orange-400">
                Our Mission
              </h2>
              <div className="flex flex-wrap justify-between">
                <div className="w-full md:w-1/3 px-4 mb-6">
                  <h3 className="text-xl font-bold mb-2">
                    Quality Ingredients
                  </h3>
                  <p className="text-gray-700">
                    We partner with local farms and suppliers to bring you the
                    freshest ingredients, ensuring every meal is packed with
                    flavor.
                  </p>
                </div>
                <div className="w-full md:w-1/3 px-4 mb-6">
                  <h3 className="text-xl font-bold mb-2">
                    Customer Satisfaction
                  </h3>
                  <p className="text-gray-700">
                    Our top priority is to provide an excellent experience. We
                    believe in great food, timely delivery, and exceptional
                    service.
                  </p>
                </div>
                <div className="w-full md:w-1/3 px-4 mb-6">
                  <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                  <p className="text-gray-700">
                    We are committed to reducing our environmental footprint by
                    using eco-friendly packaging and promoting sustainable
                    practices.
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* Meet the Team Section */}
          <section className="container mx-auto px-6 py-12">
            <h2 className="text-3xl font-semibold mb-6 text-center text-orange-400">
              Meet the Team
            </h2>
            <div className="flex flex-wrap justify-around">
              {/* Team Member 1 */}
              <div className="w-full md:w-1/3 lg:w-1/4 text-center mb-6">
                <img
                  className="rounded-full mx-auto mb-4 w-40 h-40 object-cover"
                  src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg"
                  alt="Team member"
                />
                <h3 className="text-xl font-bold">John Doe</h3>
                <p className="text-gray-700">Founder & CEO</p>
              </div>

              {/* Team Member 2 */}
              <div className="w-full md:w-1/3 lg:w-1/4 text-center mb-6">
                <img
                  className="rounded-full mx-auto mb-4 w-40 h-40 object-cover"
                  src="https://img.freepik.com/free-photo/close-up-portrait-smiley-man_23-2148221703.jpg"
                  alt="Team member"
                />
                <h3 className="text-xl font-bold">Jane Smith</h3>
                <p className="text-gray-700">Head Chef</p>
              </div>
            </div>
          </section>
        </Effect>
      </div>
    </>
  );
};

export default AboutUs;
