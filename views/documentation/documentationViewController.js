// *** shared services
import { currentApplicationPath } from '../../shared/assets/constants.js'
import { launchInitialisation } from '../../shared/services/initialisationService.js'
import { headerViewDisplay } from '../../shared/assets/components/global/headerViewCont.js'
import { footerViewDisplay } from '../../shared/assets/components/global/footerViewCont.js'
import { parseMarkdown, simpleMarkdown, loadFile, loadFileFetch } from '../../shared/functions/commonFunctions.js'
// *** Menu string
const mainStringPage = ` 
# test 
## Collaborate with your team
- Invite team members and collaborators
- [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [Automatically merge when pipeline succeeds](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing(SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)
`;

export async function startDocumentationController() {

  try {
    // *** Init app
    await launchInitialisation();

    // *** Display menu
    headerViewDisplay("#menuSection");

    let mdContent = await loadFileFetch(`${currentApplicationPath}/README.md`);

    let htmldoc = simpleMarkdown(mdContent);

    document.querySelector("#mainActiveSection").innerHTML = htmldoc;
    footerViewDisplay("#footerSection");


    // var isChrome = window.chrome;
    // if (isChrome)
    //   output += 'Chrome';
    // else
    //   output += 'pas Chrome - ';
    // if (window.visualViewport.width <= 576) {
    //   output += 'phone';
    // } else if (window.visualViewport.width <= 768) {
    //   output += 'tablet';
    // } else if (window.visualViewport.width <= 992) {
    //   output += 'laptop';
    // } else { // 1200
    //   output += 'desktop';
    // }
    // if (isChrome && window.visualViewport.width <= 576)
    //   throw new Error("Warning navigation on mobiles with Chome in portait mode is not optimised. Prefer either chrome in landscape mode or anoter browser");

    // document.querySelector("#footerSection").innerHTML = output + " : " + window.visualViewport.width;
  } catch (error) {
    document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style = "margin-top:50px" role = "alert" > ${error}</div > `;
  }
}
