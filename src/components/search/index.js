import React from "react";
import "./style.scss";
function SearchCard() {
  return (
    <div class="container mt-4">
      <div class="css-rqgsqp">
        <div>
          <div class="css-bjn8wh">
            <div class="css-150a24d">
              <span class="css-1igbm66 e1n2h7jb0">
                <i size="24" class="css-lpyyjx efou2fk0">
                  <svg
                    width="24"
                    height="24"
                    preserveAspectRatio="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#4D6182"
                      d="M15.462 10.615a4.852 4.852 0 0 0-4.847-4.846 4.852 4.852 0 0 0-4.846 4.846 4.852 4.852 0 0 0 4.846 4.847 4.852 4.852 0 0 0 4.847-4.847zm5.538 9c0 .758-.627 1.385-1.385 1.385-.367 0-.724-.151-.973-.411l-3.71-3.7a7.598 7.598 0 0 1-4.317 1.342A7.613 7.613 0 0 1 3 10.615 7.613 7.613 0 0 1 10.615 3a7.613 7.613 0 0 1 7.616 7.615c0 1.536-.465 3.05-1.342 4.316l3.71 3.71c.25.25.401.607.401.974z"
                    ></path>
                  </svg>
                </i>
              </span>
              <input
                placeholder="Search by Job Title, Keywords, or Location (e.g. Sales in Cairo)"
                class="css-18p135f e1n2h7jb1"
                value=""
              />
            </div>
          </div>
        </div>
        <div tabindex="1"></div>
      </div>
    </div>
  );
}

export default SearchCard;
