---
layout: default
title: Debug Information
---

# Debug Information

## All Posts:
<ul>
{% for post in site.posts %}
    <li>
        {{ post.title }} - Tags: {{ post.tags | join: ", " }}
    </li>
{% endfor %}
</ul>

## All Tags:
<ul>
{% assign tags = site.posts | map: "tags" | flatten | uniq | sort %}
{% for tag in tags %}
    <li>
        <a href="{{ '/tags/' | append: tag | downcase | relative_url }}">{{ tag }}</a>
    </li>
{% endfor %}
</ul>