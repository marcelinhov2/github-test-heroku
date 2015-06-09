angular.module("templates",[]).run(["$templateCache",function(s){s.put("/partials/directives/results_github.html",'\n<div ng-if="results" class="results">\n  <div ng-if="results.orgs.length" class="orgs blankslate margin-top-20">\n    <h2>Total de organizações: {{results.orgs.length}}</h2>\n    <ul>\n      <li ng-repeat="org in results.orgs track by org.id"><a ng-href="/infos/orgs/{{org.login}}"><img ng-src="{{org.avatar_url}}" width="50" height="50" class="avatar"/>\n          <h3 class="css-truncate">{{org.login}}</h3></a></li>\n    </ul>\n  </div>\n  <div ng-if="results.users.length" class="users blankslate margin-top-20">\n    <h2>Total de usuários: {{results.users.length}}</h2>\n    <ul>\n      <li ng-repeat="user in results.users track by user.id"><a ng-href="/infos/users/{{user.login}}"><img ng-src="{{user.avatar_url}}" width="50" height="50" class="avatar"/>\n          <h3 class="css-truncate">{{user.login}}</h3></a></li>\n    </ul>\n  </div>\n  <div ng-if="results.repos.length" class="repos blankslate margin-top-20">\n    <h2>Total de repositórios: {{results.repos.length}}</h2>\n    <ul>\n      <li ng-repeat="repo in results.repos track by repo.id"><a ng-href="/infos/repos/{{repo.owner.login}}/{{repo.name}}"><img ng-src="{{repo.owner.avatar_url}}" width="50" height="50" class="avatar"/>\n          <h3 class="css-truncate">{{repo.full_name}}</h3></a></li>\n    </ul>\n  </div>\n  <div ng-if="results.repos.length == 0 &amp;&amp; results.users.length == 0 &amp;&amp; results.orgs.length == 0" class="error">\n    <h2>Alguma coisa deu errado, tente novamente!</h2>\n  </div>\n</div>'),s.put("/partials/directives/search_github.html",'\n<div class="search-directive">\n  <form>\n    <fieldset>\n      <input type="text" ng-keyup="keyup_handler()" ng-model="form.search_value" placeholder="Ex: marcelinhov2" class="input-block text-center"/>\n    </fieldset>\n  </form>\n</div>'),s.put("/partials/views/home.html",'\n<div id="home">\n  <h1 class="text-center">Search for your repositories or users/organizations</h1>\n  <search-github-directive></search-github-directive>\n  <results-github-directive></results-github-directive>\n</div>'),s.put("/partials/views/infos/orgs.html",'\n<div id="orgs" ng-if="result">\n  <div ng-if="result.orgs.org" class="org container">\n    <div class="org-container columns">\n      <div class="sidebar one-fourth column">\n        <div class="basic-info"><img src="{{result.orgs.org.avatar_url}}" alt="" width="230" height="230" class="avatar"/>\n          <h2>{{result.orgs.org.name}}</h2><a ng-href="{{result.orgs.org.blog}}" target="_blank">{{result.orgs.org.blog}}</a>\n        </div>\n        <div class="followers-container">\n          <h2>MEMBERS</h2>\n          <div class="followers-list">\n            <ul>\n              <li ng-repeat="member in result.orgs.members track by member.id"> \n                <div class="basic-info">\n                  <div aria-label="{{member.login}}" class="tooltipped tooltipped-n"><a ng-href="/infos/users/{{member.login}}"><img src="{{member.avatar_url}}" alt="" width="50" height="50" class="avatar"/></a></div>\n                </div>\n              </li>\n            </ul>\n          </div>\n        </div>\n      </div>\n      <div class="main-content three-fourths column">\n        <div class="repos-container">\n          <h2>Repositories</h2>\n          <div class="repos-list">\n            <ul>\n              <li ng-repeat="repo in result.orgs.repos track by repo.id" class="blankslate margin-top-20"><a ng-href="/infos/repos/{{repo.owner.login}}/{{repo.name}}">\n                  <div class="repo-info">\n                    <h3>{{repo.name}} ( {{repo.full_name}} )</h3>\n                    <h4>{{repo.description}}</h4>\n                    <ul>\n                      <li class="default_branch">{{repo.default_branch}}</li>\n                      <li class="last_update">Last Commit: {{repo.updated_at | date:\'dd/MM/yyyy hh:MM\'}}</li>\n                      <li class="forks_count">Forks: {{repo.forks_count}}</li>\n                      <li class="watchers_count">Watchers: {{repo.watchers_count}}</li>\n                    </ul>\n                  </div></a></li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>'),s.put("/partials/views/infos/repos.html",'\n<div id="repos" ng-if="result">\n  <div ng-if="result.repos.repo" class="repo container">\n    <div class="repo-container columns">\n      <div class="sidebar one-fourth column">\n        <div class="basic-info">\n          <div aria-label="{{result.repos.repo.owner.login}}" class="tooltipped tooltipped-s"><a ng-href="/infos/users/{{result.repos.repo.owner.login}}"><img src="{{result.repos.repo.owner.avatar_url}}" alt="" width="230" height="230" class="avatar"/></a></div>\n        </div>\n        <div class="basic-info">\n          <h2>{{result.repos.repo.name}}</h2>\n          <ul>\n            <li>Forks: {{result.repos.repo.forks_count}}</li>\n            <li>Stars: {{result.repos.repo.stargazers_count}}</li>\n            <li>Watchers: {{result.repos.repo.watchers_count}}</li>\n          </ul>\n        </div>\n      </div>\n      <div class="main-content three-fourths column">\n        <h2>Repository</h2>\n        <div class="repos-menu">\n          <ul ng-init="tab = 1">\n            <li ng-class="{active:tab===1}" class="inline-block"><a ng-class="{ \'btn-primary\': tab===1 }" ng-click="tab = 1" class="btn">Commits</a></li>\n            <li ng-class="{active:tab===2}" class="inline-block"><a ng-class="{ \'btn-primary\': tab===2 }" ng-click="tab = 2" class="btn">Pull Requests</a></li>\n          </ul>\n        </div>\n        <div ng-show="tab === 1" class="commits-container">\n          <ul>\n            <li ng-repeat="commit in result.repos.commits track by commit.sha" class="blankslate margin-top-20"> \n              <div class="basic-info">\n                <h2>{{commit.commit.message}}</h2>\n                <p>{{commit.committer.login}}</p>\n              </div>\n            </li>\n          </ul>\n        </div>\n        <div ng-show="tab === 2" class="pull_requests-container">\n          <ul>\n            <li ng-repeat="pr in result.repos.pull_requests track by pr.id" class="blankslate margin-top-20"> \n              <div class="basic-info">\n                <h2>{{pr.title}}</h2>\n                <p> <span>#</span>{{pr.number}} - {{pr.head.user.login}}</p>\n              </div>\n            </li>\n          </ul>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>'),s.put("/partials/views/infos/users.html",'\n<div id="users" ng-if="result">\n  <div ng-if="result.users.user" class="user container">\n    <div class="user-container columns">\n      <div class="sidebar one-fourth column">\n        <div class="basic-info"><img src="{{result.users.user.avatar_url}}" alt="" width="230" height="230" class="avatar"/>\n          <h2>{{result.users.user.name}}</h2>\n          <h3>{{result.users.user.login}}</h3>\n        </div>\n        <div class="additional-info">\n          <ul>\n            <li class="location">{{result.users.user.location}}</li>\n            <li class="email"><a ng-href="mailto:{{result.users.user.email}}">{{result.users.user.email}}</a></li>\n            <li class="blog"> <a ng-href="{{result.users.user.blog}}" target="_blank">{{result.users.user.blog}}</a></li>\n            <li class="created_at">Joined: {{result.users.user.created_at | date:\'dd/MM/yyyy\'}}</li>\n          </ul>\n        </div>\n        <div class="more-info">\n          <ul>\n            <li class="followers">Followers: {{result.users.user.followers}}</li>\n            <li class="public_repos">Public Repos: {{result.users.user.public_repos}}</li>\n            <li class="following">Following: {{result.users.user.following}}</li>\n          </ul>\n        </div>\n        <div ng-if="result.users.followers.length" class="followers-container">\n          <h2>Followers</h2>\n          <div class="followers-list">\n            <ul>\n              <li ng-repeat="follower in result.users.followers track by follower.id"> \n                <div class="basic-info">\n                  <div aria-label="{{follower.login}}" class="tooltipped tooltipped-n"><a ng-href="/infos/users/{{follower.login}}"><img src="{{follower.avatar_url}}" alt="" width="50" height="50" class="avatar"/></a></div>\n                </div>\n              </li>\n            </ul>\n          </div>\n        </div>\n      </div>\n      <div class="main-content three-fourths column">\n        <div class="repos-container">\n          <h2>User Repositories</h2>\n          <div class="repos-menu">\n            <ul>\n              <li class="inline-block"><a ng-class="{ \'btn-primary\': !is_repos_filtered }" ng-click="filter_repos_by(\'fork\')" class="btn">All <span ng-if="result" ng-init="total_length = result.users.repos.length" class="counter">{{total_length}}</span></a></li>\n              <li class="inline-block"><a ng-click="filter_repos_by(\'fork\', false)" ng-class="{\'btn-primary\': is_repos_fork == false}" class="btn">Sources <span ng-if="result" ng-init="sources_length = get_repo_type_length(\'fork\', false)" class="counter">{{sources_length}}</span></a></li>\n              <li class="inline-block"><a ng-click="filter_repos_by(\'fork\', true)" ng-class="{\'btn-primary\': is_repos_fork == true}" class="btn">Forks <span ng-if="result" ng-init="forks_length = get_repo_type_length(\'fork\', true)" class="counter">{{forks_length}}</span></a></li>\n            </ul>\n          </div>\n          <div class="repos-list">\n            <ul>\n              <li ng-repeat="repo in result.users.repos track by repo.id" ng-class="{ fork: repo.fork }" class="blankslate margin-top-20"><a ng-href="/infos/repos/{{repo.owner.login}}/{{repo.name}}">\n                  <div class="repo-info">\n                    <h3>{{repo.name}} ( {{repo.full_name}} )</h3>\n                    <h4>{{repo.description}}</h4>\n                    <ul>\n                      <li class="default_branch">{{repo.default_branch}}</li>\n                      <li class="last_update">Last Commit: {{repo.updated_at | date:\'dd/MM/yyyy hh:MM\'}}</li>\n                      <li class="forks_count">Forks: {{repo.forks_count}}</li>\n                      <li class="watchers_count">Watchers: {{repo.watchers_count}}</li>\n                    </ul>\n                  </div></a></li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>')}]);