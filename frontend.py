from flask import Flask, request, url_for, g, session, json, render_template
import arrow
# Local libraries
import cfg, library


app = Flask(__name__)

@app.before_request
def app_before_request():
    g.settings = {
        "branding": {
            "title": "JeremyLDowns"
            "logo": ""
            }
    }
    ua = ua_parse(request.user_agent.string)
    g.client = {
        "is_mobile": ua.is_mobile,
        "user_agent": str(ua),
        "browser": request.user_agent.browser,
        "browser_class": "is-safari" if ua.browser.family == "Mobile Safari" else "",
        "ip_address": request.headers.get("x-forwarded-for"),
        "route": request.access_route
    }

@app.after_request
def app_after_request(response):
    for header in cfg.default_headers:
        response.headers.setdefault(header, cfg.default_headers[header])
    return response

@app.route("/")
def index():
    if not authorized(): # not authorized():
        if request.is_xhr:
            abort(401)
        else:
            return redirect(url_for("login"))
    return "Hello"



# Routes: Skills, Personal, Contact, Sitemap

def xhr_response():
    pass

def authorized():
    pass

app.run(debug=True)
