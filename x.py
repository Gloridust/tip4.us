import requests
import json

def parse_tweet(tweet_url):
    # 从URL中提取tweet ID
    tweet_id = tweet_url.split('/')[-1]

    # 构建API URL
    api_url = f"https://x.com/i/api/graphql/VwKJcAd7zqlBOitPLUrB8A/TweetDetail"
    
    # 构建查询参数
    params = {
        "variables": json.dumps({
            "focalTweetId": tweet_id,
            "with_rux_injections": False,
            "includePromotedContent": True,
            "withCommunity": True,
            "withQuickPromoteEligibilityTweetFields": True,
            "withBirdwatchNotes": True,
            "withVoice": True,
            "withV2Timeline": True
        }),
        "features": json.dumps({
            "rweb_lists_timeline_redesign_enabled": True,
            "responsive_web_graphql_exclude_directive_enabled": True,
            "verified_phone_label_enabled": False,
            "creator_subscriptions_tweet_preview_api_enabled": True,
            "responsive_web_graphql_timeline_navigation_enabled": True,
            "responsive_web_graphql_skip_user_profile_image_extensions_enabled": False,
            "tweetypie_unmention_optimization_enabled": True,
            "vibe_api_enabled": True,
            "responsive_web_edit_tweet_api_enabled": True,
            "graphql_is_translatable_rweb_tweet_is_translatable_enabled": True,
            "view_counts_everywhere_api_enabled": True,
            "longform_notetweets_consumption_enabled": True,
            "tweet_awards_web_tipping_enabled": False,
            "freedom_of_speech_not_reach_fetch_enabled": True,
            "standardized_nudges_misinfo": True,
            "tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled": True,
            "interactive_text_enabled": True,
            "responsive_web_text_conversations_enabled": False,
            "longform_notetweets_rich_text_read_enabled": True,
            "responsive_web_enhance_cards_enabled": False
        })
    }

    # 发送请求
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    response = requests.get(api_url, params=params, headers=headers)
    
    if response.status_code != 200:
        return "Error: Unable to fetch tweet data"

    # 解析JSON响应
    data = response.json()

    # 提取所需信息
    tweet_data = data['data']['threaded_conversation_with_injections']['instructions'][0]['entries'][0]['content']['itemContent']['tweet_results']['result']
    
    author = tweet_data['core']['user_results']['result']['legacy']['name']
    username = tweet_data['core']['user_results']['result']['legacy']['screen_name']
    full_text = tweet_data['legacy']['full_text']
    
    # 提取图片URL（如果有）
    images = []
    if 'extended_entities' in tweet_data['legacy'] and 'media' in tweet_data['legacy']['extended_entities']:
        for media in tweet_data['legacy']['extended_entities']['media']:
            if media['type'] == 'photo':
                images.append(media['media_url_https'])

    return {
        "author": author,
        "username": username,
        "full_text": full_text,
        "images": images
    }

# 使用示例
tweet_url = "https://x.com/lagguydesign/status/1808674590568178139"
result = parse_tweet(tweet_url)
print(json.dumps(result, indent=2))